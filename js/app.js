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
 ma.native("getMiniAppToken", { appId: merchantAppId })
      .then(res => {
        log("getMiniAppToken res :", res);
        const data = JSON.parse(res);
        resolve(data.token);
      })
      .catch(err => reject(err));
log("------------:");

}

function getMiniAppToken() {
  return new Promise((resolve, reject) => {
    ma.native("getMiniAppToken", { appId: merchantAppId })
      .then(res => {
        log("getMiniAppToken res :", res);
        const data = JSON.parse(res);
        resolve(data.token);
      })
      .catch(err => reject(err));
  });
}

// API BackEnd pour authentifier l'utilisateur
function authToken(token) {
  log("authToken", token);

  return fetch(baseUrl + "/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authToken: token })
  })
    .then(res => res.json())
    .then(json => {
      log("auth response:", json);

      const biz = json.biz_content;

      document.getElementById("userinfo").innerHTML = `
        <br>openId:<br> <span style="color:red;">${biz.open_id}</span>
        <br><br>identityId:<br> <span style="color:red;">${biz.identityId}</span>
      `;
    });
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
