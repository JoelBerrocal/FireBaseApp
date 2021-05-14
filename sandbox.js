// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBipWEVwymWMeZWWb41ACp5WBgOGnc4zak",
    authDomain: "begudes-bdd.firebaseapp.com",
    projectId: "begudes-bdd",
    storageBucket: "begudes-bdd.appspot.com",
    messagingSenderId: "13730988998",
    appId: "1:13730988998:web:210994912894e946a2a8c7",
    measurementId: "G-ZLE14QCFK3"
  };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  
 const db = firebase.firestore();
 const list = document.querySelector("main");
 const form = document.querySelector("form");
 
 const addRecipe = (recipe, id) => {
   let formattedTime = recipe.created_at.toDate();
   let html = `
         <li data-id="${id}">
             <div>${recipe.title}</div>

             <div>${recipe.author}</div>
             <div>${recipe.contraseña}</div>
             <div>${formattedTime}</div>
             <button class="btn btn-dark btn-sm my-2">delete</button>
         </li>
     `;
   console.log(html);
   list.innerHTML += html;
 };
 
 // add documents
 form.addEventListener("submit", (e) => {
   e.preventDefault();
   let now = new Date();
   const recipe = {
     title: form.recipe.value,
     created_at: firebase.firestore.Timestamp.fromDate(now),
     author: form.usuario.value,
     contraseña: form.contrasena.value,
   };
   db.collection("recipes")
     .add(recipe)
     .then(() => alert("Usuari afegit"))
     .catch((err) => console.log(err));
 });
 
 // delete documents
 list.addEventListener("click", (e) => {
   //console.log(e);
   if (e.target.tagName === "BUTTON") {
     // Delete recipe
     const id = e.target.parentElement.getAttribute("data-id");
     //console.log(id);
     db.collection("recipes")
       .doc(id)
       .delete()
       .then(() => console.log("Usuari eliminat"))
       .catch((err) => console.log(err));
   }
 });
 
 db.collection("recipes").onSnapshot((snapshot) => {
   // console.log(snapshot.docChanges());
   snapshot.docChanges().forEach((change) => {
     // console.log(change);
     const doc = change.doc;
     // console.log(doc);
     if (change.type === "added") {
       addRecipe(doc.data(), doc.id);
     } else if (change.type === "removed") {
       deleteRecipe(doc.id);
     }
   });
 });
 
 const deleteRecipe = (id) => {
   const recipes = document.querySelectorAll("li");
   recipes.forEach((recipe) => {
     if (recipe.getAttribute("data-id") === id) {
       recipe.remove();
     }
   });
 };