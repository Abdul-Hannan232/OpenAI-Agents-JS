import {Agent , run} from "@openai/agents";
import "dotenv/config"

const agent = new Agent({
    name: "Assistant",
    instructions: "You are a helpful agent",
});

const result = await run(
    agent,
    "Write a haiku about recursion in programming.",
);

console.log(result.finalOutput)