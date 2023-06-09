
document.getElementById('generate-suggestions').addEventListener('click', async () => {
    // Get the user's input from the textareas
    let resume = document.getElementById('resume').value.trim();
    const jobRequirements = document.getElementById('job-requirements').value.trim();
    const savedResume = localStorage.getItem("savedResume");
    if (savedResume && !resume) {
        resume = savedResume
    }

    // Check if either field is empty
    if (!resume || !jobRequirements) {
      alert('Please enter both your resume and job requirements.');
      return;
    }
  
    // Extract the job requirements from the current tab's webpage
    // const jobRequirementsFromPage = await extractJobRequirements();

    localStorage.setItem("savedResume", resume);
    // Generate suggestions using OpenAI's API
    const suggestions = await updateSuggestions(resume,  jobRequirements);
  
  });
  
  // Function to extract job requirements from the current tab's webpage
  
  
  
  async function updateSuggestions(resumeText, jobRequirements) {
    const openaiApiKey = "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";
    const prompt = `Here are some suggestions for improving your resume based on the job requirements:\n\nResume text:\n${resumeText}\n\nJob requirements:\n${jobRequirements}\n\nSuggestions:`;
  
    const model = "text-davinci-002";
    const data = {
      prompt,
      temperature: 0.7,
      max_tokens: 100,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    };
    const response = await fetch(
      `https://api.openai.com/v1/engines/${model}/completions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    );
    const { choices } = await response.json();
    const suggestions = choices[0].text.trim();
    document.getElementById("suggestions").textContent = suggestions;
  }
  