let editor = document.getElementById('editor');
let preview = document.getElementById('preview');
let updateTimeout = null;

editor.value = localStorage.getItem("code");
function compileUml(code){
  return code.replace(/(?:\r\n|\r|\n)/g, ';')
}

function updatePreview(code) {
  let compiled = code.includes('@startuml') ? compileUml(code) : code;
  let url = "http://g.gravizo.com/svg?" + compiled;

  console.log(compiled);
  localStorage.setItem("code", code);

  preview.src = url;
}

editor.addEventListener(
  'keyup',
  (event) => {
    clearTimeout(updateTimeout);

    updateTimeout = setTimeout(() => {
      updatePreview(event.target.value);
    }, 500);
  }
);

editor.addEventListener(
  'change',
  (event) => { updatePreview(event.target.value); }
);
