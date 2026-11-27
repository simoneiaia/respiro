import { describe, expect, it, vi, afterEach } from "vitest";
import { persistResult, RESULT_SAVE_ERROR } from "../save-result";
import { scoreAssessment } from "../scoring";
import { questionnaire } from "../questionnaire";
import { buildReportText } from "../report";
import { saveResult, getResult, saveConsent, getConsent, clearSession } from "../session";

const result = () => scoreAssessment(questionnaire, Object.fromEntries(
  questionnaire.questions.map(q => [q.id, q.reverse_scored ? 4 : 0]),
));
afterEach(clearSession);

describe("salvataggio risultato e recupero", () => {
  it("mantiene il risultato e un errore sicuro dopo un rifiuto del backend", async () => {
    const original = { ...result(), save_user_id: "test-user", notes: "Nota sintetica" };
    const save = vi.fn().mockRejectedValue(new Error("provider details must stay private"));
    const failed = await persistResult(original, save);
    saveResult(failed);
    expect(getResult()).toMatchObject({ notes: "Nota sintetica", saved_id: null, save_error: RESULT_SAVE_ERROR });
    expect(buildReportText(getResult()!)).toContain("Nota sintetica");
    expect(buildReportText(getResult()!)).not.toContain("provider details");
    const recovered = await persistResult(getResult()!, vi.fn().mockResolvedValue("stored-id"));
    expect(recovered).toMatchObject({ saved_id: "stored-id", save_error: null, notes: "Nota sintetica" });
  });
  it("aggiorna e rimuove le note nel report della sessione", () => {
    saveResult(result());
    saveResult({ ...getResult()!, notes: "Nota aggiornata" });
    expect(buildReportText(getResult()!)).toContain("Nota aggiornata");
    saveResult({ ...getResult()!, notes: "" });
    expect(buildReportText(getResult()!)).not.toContain("Nota personale:");
  });
  it("cancella consenso, risultato e stato di errore alla fine della sessione", async () => {
    saveConsent({ ageConfirm: true, essential: true, health: true, saveHistory: true,
      sixMonthReminder: false, mode: "account", acceptedAt: "2026-11-27T12:00:00Z" });
    saveResult(await persistResult(result(), vi.fn().mockRejectedValue(new Error("offline"))));
    clearSession();
    expect(getConsent()).toBeNull();
    expect(getResult()).toBeNull();
  });
  it("dà priorità ai segnali di rischio anche con un punteggio totale basso", () => {
    const answers = Object.fromEntries(questionnaire.questions.map(q => [q.id, q.reverse_scored ? 4 : 0]));
    answers.q035 = 1;
    const scored = scoreAssessment(questionnaire, answers);
    expect(scored.band).toBe("low");
    expect(scored.safety_message_required).toBe(true);
    expect(buildReportText(scored)).toContain("Nota di sicurezza:");
  });
});
