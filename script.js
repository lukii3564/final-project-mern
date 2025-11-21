const FLASK_SERVER_URL = 'https://coderscave-3.onrender.com';

async function searchRecipes() {
  const ingredient = document.getElementById('ingredient').value.trim();
  const budget = document.getElementById('budget').value || '10';
  const region = document.getElementById('region').value || 'global';
  if (!ingredient) return;
  
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
  
  try {
    document.getElementById('results').innerHTML = '<div class="loading">Searching recipes</div>';
    
    const response = await fetch(url);
    const data = await response.json();
    
    document.getElementById('results').innerHTML = '';
    
    if (data.meals) {
      data.meals.forEach(meal => {
        const mealName = meal.strMeal.replace(/'/g, "\\'");
        const mealCard = `
          <div class="meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-card-content">
              <h3>${meal.strMeal}</h3>
              <button class="view-recipe-btn" onclick="getAIRecipe('${mealName}', ${budget}, '${region}')">View AI Recipe</button>
            </div>
          </div>
        `;
        document.getElementById('results').innerHTML += mealCard;
      });
    } else {
      document.getElementById('results').innerHTML = '<div class="error-message">No meals found with that ingredient. Try another ingredient.</div>';
    }
  } catch (error) {
    document.getElementById('results').innerHTML = '<div class="error-message">Failed to load recipes. Please try again later.</div>';
    console.error('Error fetching data:', error);
  }
}

async function getAIRecipe(recipeName, budget, region) {
  const modal = document.getElementById('recipeModal');
  const recipeContent = document.getElementById('recipeContent');
  
  modal.style.display = 'block';
  recipeContent.innerHTML = '<div class="loading">Generating AI recipe</div>';
  
  try {
    const flaskUrl = `${FLASK_SERVER_URL}/generate_recipe?recipe_name=${encodeURIComponent(recipeName)}&budget=${budget}&region=${region}`;
    
    const response = await fetch(flaskUrl);
    if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
    
    const data = await response.json();
    
    if (data && data.result) simulateLiveGeneration(recipeName, data.result);
    else if (data.error) throw new Error(data.error);
    else throw new Error("Invalid response format from server");
  } catch (error) {
    console.error('Error fetching AI recipe:', error);
    recipeContent.innerHTML = `<h2>${recipeName}</h2><div class="error-message"><p>Sorry, we couldn't generate the recipe at this time. Please try again later.</p><p><small>Error: ${error.message}</small></p></div><p>Ensure your Flask server is running on port 5000.</p>`;
  }
}

function simulateLiveGeneration(recipeName, recipeText) {
  const recipeContent = document.getElementById('recipeContent');
  
  recipeContent.innerHTML = `
    <h2>${recipeName} <span class="ai-badge">AI Generated</span></h2>
    <div id="liveGeneration"></div>
  `;
  
  const liveGenElement = document.getElementById('liveGeneration');
  let index = 0;
  let currentLine = '';
  
  function addText() {
    if (index < recipeText.length) {
      const char = recipeText.charAt(index);
      
      if (char === '\n') {
        currentLine += '<br>';
      } else {
        currentLine += char;
      }
      
      liveGenElement.innerHTML = currentLine;
      index++;
      
      const speed = char === ' ' ? Math.random() * 20 + 10 : Math.random() * 30 + 15;
      setTimeout(addText, speed);
    } else {
      liveGenElement.innerHTML += `<p style="font-style: italic; color: #666; margin-top: 20px;">Recipe crafted by AI. Enjoy your culinary creation!</p>`;
    }
  }
  
  addText();
}

function closeModal() {
  document.getElementById('recipeModal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('recipeModal');
  if (event.target == modal) {
    closeModal();
  }
}

document.getElementById('ingredient').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchRecipes();
  }
});

function showSubmitForm() {
  document.getElementById('submitForm').style.display = 'block';
}

async function submitRecipe() {
  const recipeName = document.getElementById('submitRecipeName').value;
  const ingredients = document.getElementById('submitIngredients').value;
  const instructions = document.getElementById('submitInstructions').value;
  const data = { recipe_name: recipeName, ingredients, instructions };
  
  try {
    const response = await fetch(`${FLASK_SERVER_URL}/submit_recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) alert('Recipe submitted successfully!');
    else throw new Error('Failed to submit recipe');
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting recipe');
  }
}
