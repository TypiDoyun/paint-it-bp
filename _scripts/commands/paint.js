import { Command } from "../command";
// import { playerPaints, sendCreatePaintForm, sendEditPaintForm } from "../forms/painter-setting";
import { sendMessage } from "../utils/player";
export default new Command()
    .setName("paint")
    .setDescription("사용자 정의 페인트를 생성합니다.")
    .setOnExecute(async (player) => {
    sendMessage(player, "채팅을 닫으면 UI가 전송됩니다!");
    // const paint = playerPaints.get(player);
    // if (paint) await sendEditPaintForm(player, paint);
    // else await sendCreatePaintForm(player);
});
