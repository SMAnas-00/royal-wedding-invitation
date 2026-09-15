import { db, doc, getDoc } from './firebase-config.js';

export function setupAuth() {
  const loginForm = document.getElementById('loginForm');
  
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const codeInput = document.getElementById('passcode');
    const errorMsg = document.getElementById('errorMsg');
    
    const code = codeInput.value.trim().toUpperCase();
    errorMsg.innerText = "Checking passcode...";

    try {
      const docRef = doc(db, "guests", code);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Guest ka data SessionStorage me store karein
        sessionStorage.setItem('guestData', JSON.stringify({
          id: code,
          ...docSnap.data()
        }));
        
        // Dashboard page par redirect karein
        window.location.href = "dashboard.html";
      } else {
        errorMsg.innerText = "Ghalat Code! Baraye meherbani sahi Passcode darj karein.";
      }
    } catch (err) {
      console.error("Auth Error:", err);
      errorMsg.innerText = "Connection error. Dobara koshish karein.";
    }
  });
}