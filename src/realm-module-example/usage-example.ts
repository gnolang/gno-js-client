import { GnoWallet } from '../wallet';
import Realm from './realm-module';
const RealmWallet = GnoWallet.addRealm(Realm)
const wallet = new RealmWallet();

const test = async () => {
    const [boardId, exists] = await wallet.r_demo_boards.query.GetBoardIDFromName({ name: "testboard"});
}