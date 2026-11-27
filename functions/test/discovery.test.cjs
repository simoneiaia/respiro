const {test}=require('node:test');
const assert=require('node:assert/strict');
test('il bundle Firebase espone solo lo scheduler esistente senza leggere segreti',()=>{
 const bundle=require('../lib/index.js');assert.deepEqual(Object.keys(bundle),['sendSixMonthReminders']);
 const fn=bundle.sendSixMonthReminders;assert.equal(typeof fn,'function');assert.equal(typeof fn.run,'function');
 assert.equal(fn.__endpoint.scheduleTrigger.schedule,'0 9 * * *');
 assert.equal(fn.__endpoint.scheduleTrigger.timeZone,'Europe/Rome');
});
test('SDK Admin modulare compatibile con Firestore e Auth usati dalla retention',async()=>{
 const {initializeApp,deleteApp}=require('firebase-admin/app');const {getFirestore}=require('firebase-admin/firestore');const {getAuth}=require('firebase-admin/auth');
 const app=initializeApp({projectId:'demo-respiro-tests'},'synthetic-retention-test');
 assert.equal(typeof getFirestore(app).collection,'function');assert.equal(typeof getAuth(app).deleteUser,'function');await deleteApp(app);
});

test('configurazione di deploy separata da Hosting e limitata alla codebase',()=>{
 const config=require('../../firebase.functions.json');const main=require('../../firebase.json');
 assert.equal(main.functions,undefined);assert.equal(config.functions.length,1);
 assert.equal(config.functions[0].runtime,'nodejs22');assert.equal(config.functions[0].codebase,'respiro-reminders');
 assert.equal(config.functions[0].source,'functions');assert.match(config.functions[0].predeploy[0],/test/);
});
