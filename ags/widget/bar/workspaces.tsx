import AstalHyprland from "gi://AstalHyprland";
import { Gtk } from "astal/gtk3";

export const Workspaces = () => {
    const hyprland = AstalHyprland.get_default();
    const ws = 7;
    const workspaces = Array.from({ length: ws }, (_, i) => i + 1);
    
    function WorkspaceButton({workspace}: {workspace: number}): JSX.Element {
        const currentWorkspace = () => hyprland.get_focused_workspace().get_id();
        return (
            <button
                setup={(self)=> {self.hook(hyprland, "event",(self) => {
                    self.toggleClassName("active", workspace === currentWorkspace())
                    self.toggleClassName("occupied", hyprland.get_workspace(workspace)?.get_clients().length > 0)
                })}} 
                onClicked={() => hyprland.get_focused_workspace().get_id() != workspace ? hyprland.dispatch("workspace", workspace.toString()) : null}
                halign={Gtk.Align.CENTER}
            >
            </button>
        );
    }

    const workspaceButtons = workspaces.map((workspace) => (
        <WorkspaceButton workspace={workspace} />
    ));

    return  <box className={"workspaces"} spacing={4} orientation={1}>
                {workspaceButtons}
            </box>
}
