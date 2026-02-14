// utils/commandExecutor.js

import { commandHandlers } from "./commandHandler";

export const executeCommand = async (
  cmd,
  context,
  currentDir,
  renderOutput,
) => {
  const args = cmd.split(" ");
  const command = args[0].toLowerCase();
  const params = args.slice(1);

  // Add command to history
  const cmdOutput = { text: `${currentDir} $ ${cmd}`, type: "command" };
  context.setCommandHistory((prev) => [...prev, cmdOutput]);

  // Empty command
  if (command === "") {
    return;
  }

  // Get the handler from imported commandHandlers
  const handler = commandHandlers[command];

  let output = [];

  if (handler) {
    // Execute the handler
    output = handler(params, context);
  } else {
    // Command not found
    output = [
      {
        text: `Command not found: ${command}. Type 'help' to see available commands.`,
        type: "error",
      },
    ];
  }

  // Render output if there is any
  if (output !== null) {
    await renderOutput(output);
  }
};
