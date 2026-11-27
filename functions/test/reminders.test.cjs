const {test}=require('node:test');
const assert=require('node:assert/strict');
const {processReminders,reminderDueDate}=require('../lib/reminders.js');
const now=new Date('2026-11-27T09:00:00Z');
const user=(id='synthetic-a',extra={})=>({id,email:`${id}@example.test`,reminder_email_enabled:true,...extra});
function fake(users=[user()],opts={}) {
 const calls={read:[],send:[],marked:[]};
 return {calls,deps:{
  async listUsers(){return users},
  async latestAssessment(uid){calls.read.push(uid);if(opts.readError===uid)throw new Error('synthetic read failure');return opts.lastAt===undefined?'2026-01-01T09:00:00Z':opts.lastAt},
  async send(email,key){calls.send.push({email,key});if(opts.throwEmail===email)throw new Error('synthetic provider failure');return opts.sendOk!==false},
  async markSent(uid,iso){calls.marked.push({uid,iso})},
 }};
}
test('nessun invio con il solo promemoria in app o senza consenso email esplicito',async()=>{
 const f=fake([user('a',{reminder_email_enabled:undefined,reminder_enabled:true}),user('b',{reminder_email_enabled:false}),user('c',{reminder_email_enabled:'true'})]);
 assert.deepEqual(await processReminders(f.deps,now),{sent:0,skipped:3,failed:0});assert.equal(f.calls.send.length,0);assert.equal(f.calls.read.length,0);
});
test('nessun invio senza email o assessment valido',async()=>{
 const f=fake([user('a',{email:null}),user('b')],{lastAt:null});
 assert.deepEqual(await processReminders(f.deps,now),{sent:0,skipped:2,failed:0});assert.equal(f.calls.send.length,0);
});
test('sei mesi di calendario con limite prima e al giorno di scadenza',async()=>{
 const f=fake([user()],{lastAt:'2026-05-27T09:00:00Z'});
 assert.equal((await processReminders(f.deps,new Date('2026-11-27T08:59:59Z'))).sent,0);
 assert.equal((await processReminders(f.deps,now)).sent,1);
 assert.deepEqual(f.calls.marked,[{uid:'synthetic-a',iso:now.toISOString()}]);
 assert.equal(f.calls.send[0].key,'respiro-reminder/synthetic-a/2026-11-27');
});
test('fine mese e anno bisestile non slittano al mese successivo',()=>{
 assert.equal(reminderDueDate('2025-08-31T09:00:00Z').toISOString(),'2026-02-28T09:00:00.000Z');
 assert.equal(reminderDueDate('2027-08-31T09:00:00Z').toISOString(),'2028-02-29T09:00:00.000Z');
});
test('timestamp mancanti o malformati non fanno partire email',async()=>{
 for(const value of [null,undefined,'not-a-date','',123]){
  assert.equal(reminderDueDate(value),null);
  const f=fake([user()],{lastAt:value===undefined?null:value});
  assert.equal((await processReminders(f.deps,now)).sent,0);
 }
});
test('cooldown di 14 giorni e date future impediscono il reinvio',async()=>{
 const f=fake([user('a',{last_reminder_email_sent_at:'2026-11-26T09:00:00Z'}),user('b',{last_reminder_email_sent_at:'2026-12-01T09:00:00Z'}),user('c',{last_reminder_email_sent_at:'invalid'})]);
 assert.deepEqual(await processReminders(f.deps,now),{sent:0,skipped:3,failed:0});assert.equal(f.calls.read.length,0);
 const ready=fake([user('d',{last_reminder_email_sent_at:'2026-11-13T09:00:00Z'})]);assert.equal((await processReminders(ready.deps,now)).sent,1);
});
test('errore del provider non registra un invio riuscito',async()=>{
 const f=fake([user()],{sendOk:false});assert.deepEqual(await processReminders(f.deps,now),{sent:0,skipped:0,failed:1});assert.equal(f.calls.marked.length,0);
});
test('un errore di lettura o invio non interrompe gli utenti successivi',async()=>{
 const f=fake([user('a'),user('b'),user('c')],{readError:'a',throwEmail:'b@example.test'});
 assert.deepEqual(await processReminders(f.deps,now),{sent:1,skipped:0,failed:2});assert.deepEqual(f.calls.marked,[{uid:'c',iso:now.toISOString()}]);
});
test('la chiave idempotente è stabile per la stessa scadenza',async()=>{
 const f=fake();await processReminders(f.deps,now);await processReminders(f.deps,new Date('2026-11-28T09:00:00Z'));assert.equal(f.calls.send[0].key,f.calls.send[1].key);
});
