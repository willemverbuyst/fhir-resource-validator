import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>FHIR Resource Validator</h1>
    <label for="resourceInput">Add resource:</label>
    <textarea id="resourceInput" name="resource input" rows="40" cols="50">...</textarea> 
  </div>
`;
