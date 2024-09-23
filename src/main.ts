import { parseNr, getCliCommand } from "@antfu/ni";

export async function buildRunKnipCommand(
  buildScriptName: string
): Promise<string> {
  const cmd = await getCliCommand(
    parseNr,
    [buildScriptName, "--reporter json"],
    {
      programmatic: true,
    }
  );
  if (!cmd) {
    throw new Error("Unable to generate command for package manager");
  }
  const command = `${cmd.command} ${cmd.args.join(" ")}`;

  return command;
}
