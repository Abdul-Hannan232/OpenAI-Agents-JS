import {Agent, run, tool} from "@openai/agents";
import "dotenv/config";
import {z} from "zod"

const historyFunFact = tool({
    name: "history_fun_fact",
    description: "Give a fun fact about a historical event.",
    parameters: z.object({}),
    execute: async ()=> {
        return "Sharks are older than trees";
    },
});

const historyTutorAgent = new Agent({
    name: "History Tutor",
    instructions: 'You provide assistance with historical queries. Explain important events and context clearly.',
    tools: [historyFunFact],
})

const mathTutorAgent = new Agent({
    name: "Math Tutor",
    instructions:  'You provide help with math problems. Explain your reasoning at each step and include examples',
})

const triageAgent = Agent.create({
    name: "Triage Agent",
    instructions: "You determine which agent to use based on the user's homework question.",
    handoffs: [historyTutorAgent, mathTutorAgent],
})

async function main (){
    const result = await run(
    triageAgent,
    "What is the capital of france?");

    console.log(result.finalOutput)
}

main().catch(err => console.error(err))
