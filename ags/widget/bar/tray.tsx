import AstalTray from "gi://AstalTray"
import { bind } from "astal"
import { App, Gdk } from "astal/gtk3"

export const Tray = () => {
    const tray = AstalTray.Tray.get_default()

    console.log(tray.items)

    return <box>
        {bind(tray, "items").as(items => items.map(item => {
            if (item.iconThemePath)
                App.add_icons(item.iconThemePath)

            const menu = item.create_menu()

            return <button
                tooltipMarkup={bind(item, "tooltipMarkup")}
                onDestroy={() => menu?.destroy()}
                onClickRelease={self => {
                    menu?.popup_at_widget(self, Gdk.Gravity.EAST, Gdk.Gravity.NORTH_WEST, null)
                }}>
                <icon gIcon={bind(item, "gicon")} />
            </button>
        }))}
    </box>
}
