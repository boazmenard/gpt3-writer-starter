import { Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Give me a weekly workout and diet plan that will give me the body of the anime character below. I want the exercises, sets, and reps and breakfast, lunch, dinner, and snacks. I do not want to workout longer than 1 hour each day that I workout.

Anime Character:
`
const generateAction = async (req, res) => {

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.8,
        max_tokens: 650
    });

    const baseCompletionOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: baseCompletionOutput });
}

export default generateAction;