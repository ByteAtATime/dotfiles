import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"
import { Tray } from "./bar/tray"
import { Workspaces } from "./bar/workspaces"

const hour = Variable("").poll(1000, `date +"%H"`)
const minute = Variable("").poll(1000, `date +"%M"`)
const second = Variable("").poll(1000, `date +"%S"`)

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        className="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.BOTTOM
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.TOP}
        application={App}>
            <box orientation={1}>
                <box className="time" orientation={1}>
                    <label label={hour()} />
                    <label label={minute()} />
                    <label label={second()} />
                </box>
                
                <Tray />

                <Workspaces />
            </box>
    </window>
}
