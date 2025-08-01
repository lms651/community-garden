var _a;
import { loadTrades, saveTrades } from "../trade_logic/trades.js";
import { loadCurrentUser } from "../user_logic/user-utils.js";
const allTrades = (_a = loadTrades()) !== null && _a !== void 0 ? _a : [];
function render_messages_init() {
    const result = loadCurrentUser();
    if (!result)
        return;
    const currentUser = result.user;
    const messagesContainer = document.getElementById("messagesContainer");
    if (!messagesContainer)
        return;
    messagesContainer.innerHTML = "";
    // Filter accepted trades related to current user
    const relevantTrades = allTrades.filter(trade => trade.status === "accepted" &&
        (trade.fromUser === currentUser.username || trade.toUser === currentUser.username));
    // Sort by date descending
    relevantTrades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Render messages
    for (const trade of relevantTrades) {
        renderAcceptedMessage(trade, currentUser);
    }
}
// each rendered as accordian collapsible panel
function renderAcceptedMessage(trade, currentUser) {
    const otherUsername = (trade.fromUser === currentUser.username) ? trade.toUser : trade.fromUser;
    const tradeDate = new Date(trade.date).toLocaleDateString();
    const tradeDetails = `${trade.offeredPlant} ↔ ${trade.requestedPlant}`;
    // create container for accordian div
    const container = document.createElement("div");
    container.className = "border border-blue-300 rounded-xl overflow-hidden mb-6";
    // button header
    const button = document.createElement("button");
    button.type = "button";
    button.className = "w-full px-4 py-3 text-left font-semibold bg-blue-100 hover:bg-green-100 transition";
    button.textContent = `Trade on ${tradeDate} with ${otherUsername}: ${tradeDetails}`;
    button.addEventListener("click", () => {
        contentDiv.classList.toggle("hidden");
    });
    // collapsible content (hidden until header button clicked)
    const contentDiv = document.createElement("div");
    contentDiv.className = "hidden px-4 py-3 bg-white";
    // message list
    const messageList = document.createElement("ul");
    messageList.className = "mb-3 space-y-2";
    trade.messages.forEach(msg => {
        const li = document.createElement("li");
        li.className = msg.from === currentUser.username ? "text-sm bg-gray-50 p-2 rounded" : "text-sm bg-gray-100 p-2 rounded";
        li.textContent = `${msg.from}: ${msg.text}`;
        messageList.appendChild(li);
    });
    // Text input and send button
    const inputDiv = document.createElement("div");
    inputDiv.className = "flex gap-2";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Send a message...";
    input.className = "flex-grow border border-gray-300 rounded px-3 py-2 text-sm";
    const sendBtn = document.createElement("button");
    sendBtn.className = "bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700";
    sendBtn.textContent = "Send";
    // Send button listener
    sendBtn.addEventListener("click", () => {
        const text = input.value.trim();
        if (!text)
            return;
        // Add message to the trade's message array
        trade.messages.push({ from: currentUser.username, text });
        // Display message
        const newMsgLi = document.createElement("li");
        newMsgLi.className = "text-sm bg-gray-50 p-2 rounded";
        newMsgLi.textContent = `${currentUser.username}: ${text}`;
        messageList.appendChild(newMsgLi);
        input.value = "";
        // Save messages along with trade
        saveTrades(allTrades);
    });
    inputDiv.appendChild(input);
    inputDiv.appendChild(sendBtn);
    contentDiv.appendChild(messageList);
    contentDiv.appendChild(inputDiv);
    container.appendChild(button);
    container.appendChild(contentDiv);
    const messagesContainer = document.getElementById("messagesContainer");
    messagesContainer === null || messagesContainer === void 0 ? void 0 : messagesContainer.appendChild(container);
}
export { render_messages_init };
