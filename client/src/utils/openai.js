import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const improveWithGPT = async (text) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I am giving you an input which is part of resume of a candidate, update the text by making it more impactful. Return me a JSON with key "response".
            this is the input - ${text}`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const jsonResponse = JSON.parse(completion.choices[0].message.content);
    const improvedText = jsonResponse["response"];
    return improvedText;
  } catch (error) {
    console.error("Error improving single text from GPT", error.message);
    return text;
  }
};

const improveContentWithGPTParallel = async (elements) => {
  // Use Promise.all to make parallel API calls
  const results = await Promise.all(
    elements.map(async (element, index) => {
      try {
        // Make your asynchronous API call here
        const improvedText = await improveWithGPT(element);
        return { id: index, content: improvedText };
      } catch (error) {
        // Handle errors if needed
        console.error(`Error fetching data for element ${element}: ${error}`);
        return { id: index, content: null };
      }
    })
  );

  // Re-create a new array with the results in the original order
  const reorderedResults = results.sort((a, b) => a.id - b.id).map((result) => result.content);
  return reorderedResults;
};

export const improveResumeJSONWithGPT = async (inputResumeJSON) => {
  try {
    const originalProjectDescriptions = inputResumeJSON.projectList.map((item) => item.description);
    const improvedProjectDescriptions = await improveContentWithGPTParallel(originalProjectDescriptions);

    const originalExperienceDescriptions = inputResumeJSON.experienceList.map((item) => item.description);
    const improvedExperienceDescriptions = await improveContentWithGPTParallel(originalExperienceDescriptions);

    const improvedResumeJSON = JSON.parse(JSON.stringify(inputResumeJSON));
    originalProjectDescriptions.forEach(
      (ele, index) => (improvedResumeJSON.projectList[index].description = improvedProjectDescriptions[index])
    );
    originalExperienceDescriptions.forEach(
      (ele, index) => (improvedResumeJSON.experienceList[index].description = improvedExperienceDescriptions[index])
    );

    return improvedResumeJSON;
  } catch (err) {
    console.log("Error while improving with GPT", err);
    return inputResumeJSON;
  }
};
