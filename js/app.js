// Montant
let price = 100;

// Log helper
function log(msg, data) {
  console.log(msg, data ?? "");
  const el = document.getElementById("log");
  el.textContent += (data ? msg + " " + JSON.stringify(data, null, 2) : msg) + "\n";
}

// -------------------------- AUTO LOGIN --------------------------
function autoLogin() {
  log("merchantAppId", merchantAppId);

  // Vérifier environnement
  ma.miniProgram.getEnv(res => {
    log("ENV:", res);
  });

log("------------:");
 var x = ma.miniProgram.autoLogin();
 log("✔ Auto login success:", res);

log("------------:");

}
 
 

// ------------------------- PAIEMENT MOCK --------------------------
function startPay() {
  log("⏳ Paiement demandé…");

  // rawRequest FAKE (pour tests)
  const rawRequest =
    "appid=" + merchantAppId +
    "&merch_code=" + merchantCode +
    "&nonce_str=123456" +
    "&prepay_id=MOCK_PREPAY" +
    "&timestamp=" + Date.now() +
    "&sign=FAKE" +
    "&sign_type=SHA256WithRSA";

  log("rawRequest:", rawRequest);

  ma.native("startPay", { rawRequest })
    .then(res => log("✔ Paiement terminé :", res))
    .catch(err => log("❌ Paiement erreur :", err));
}

// -------------------------- INIT --------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("price").textContent = price;
  autoLogin();
  document.getElementById("payBtn").addEventListener("click", startPay);
});
