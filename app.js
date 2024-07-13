const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchinput');
const definitionDiv = document.getElementById('definition');

const fetchDefinition = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayDefinition(data);
  } catch (error) {
    console.error('Error fetching definition:', error);
    definitionDiv.innerText = 'Not Exist';
    definitionDiv.classList.remove('d-none', 'alert-info');
    definitionDiv.classList.add('alert-danger');
  }
};

const displayDefinition = (data) => {
  if (data.title && data.title === "No Definitions Found") {
    definitionDiv.innerText = "No definitions found for this word.";
    definitionDiv.classList.remove('d-none', 'alert-info');
    definitionDiv.classList.add('alert-warning');
    return;
  }
  
  const meaning = data[0].meanings[0].definitions[0].definition;
  definitionDiv.innerText = meaning;
  definitionDiv.classList.remove('d-none', 'alert-warning', 'alert-danger');
  definitionDiv.classList.add('alert-info');
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const word = searchInput.value.trim();
  if (word) {
    fetchDefinition(word);
  } else {
    definitionDiv.innerText = 'Please enter a word.';
    definitionDiv.classList.remove('d-none', 'alert-info');
    definitionDiv.classList.add('alert-warning');
  }
});
