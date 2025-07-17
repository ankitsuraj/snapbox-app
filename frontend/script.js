function selectPhoto(num) {
  document.getElementById('photo' + num).click();
  document.getElementById('photo' + num).onchange = function () {
    if (this.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const box = document.querySelectorAll('.grid div')[num - 1];
        box.style.backgroundImage = `url(${e.target.result})`;
        box.style.backgroundSize = 'cover';
        box.innerText = '';
      };
      reader.readAsDataURL(this.files[0]);
    }
  };
}

function submitPhotos() {
  const formData = new FormData();
  for (let i = 1; i <= 4; i++) {
    const fileInput = document.getElementById('photo' + i);
    if (fileInput.files[0]) formData.append('photos', fileInput.files[0]);
  }

  fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Success') {
        document.getElementById('msg').classList.remove('hidden');
      }
    })
    .catch(err => alert('Upload failed'));
}
