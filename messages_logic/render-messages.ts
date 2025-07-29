import { loadTrades, saveTrades } from "../trade_logic/trades.js";
import { loadCurrentUser } from "../user_logic/user-utils.js";
import { Trade } from "../trade_logic/Trade.js";
import { User } from "../user_logic/user.js";

const allTrades = loadTrades() ?? [];

function render_messages_init(): void {

    const result = loadCurrentUser();
    if (!result) return;
    const currentUser = result.user;

    const messagesContainer = document.getElementById("messagesContainer");
    if (!messagesContainer) return;

    // Clear container
    messagesContainer.innerHTML = "";

    // Filter accepted trades related to current user
    const relevantTrades = allTrades.filter(trade =>
        trade.status === "accepted" &&
        (trade.fromUser === currentUser.username || trade.toUser === currentUser.username)
    );

    // Sort by date descending
    relevantTrades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Render in sorted order
    for (const trade of relevantTrades) {
        renderAcceptedMessage(trade, currentUser);
    }
}

// each rendered as accordian collapsible panel
function renderAcceptedMessage(trade: Trade, currentUser: User): void {

  // 1. Find the other user in the trade (not currentUser)
  const otherUsername = (trade.fromUser === currentUser.username) ? trade.toUser : trade.fromUser;

  // 2. Format trade date nicely
  const tradeDate = new Date(trade.date).toLocaleDateString();

  // 3. Build trade details string (e.g. "Tomato for Cucumber")
  const tradeDetails = `${trade.offeredPlant} ↔ ${trade.requestedPlant}`;

  // 4. Create root container div for this accordion item
  const container = document.createElement("div");
  container.className = "border border-gray-300 rounded-xl overflow-hidden mb-6";

  // 5. Create button header
  const button = document.createElement("button");
  button.type = "button";
  button.className = "w-full px-4 py-3 text-left font-semibold bg-gray-100 hover:bg-gray-200 transition";
  button.textContent = `Trade on ${tradeDate} with ${otherUsername}: ${tradeDetails}`;
  button.addEventListener("click", () => {
    contentDiv.classList.toggle("hidden");
  });

  // 6. Create collapsible content div (initially hidden)
  const contentDiv = document.createElement("div");
  contentDiv.className = "hidden px-4 py-3 bg-white";

  // 7. Create messages list container
  const messageList = document.createElement("ul");
  messageList.className = "mb-3 space-y-2";

  // 8. Fill messages for this trade (assume trade.messages is an array of { from: string, text: string })
  trade.messages.forEach(msg => {
    const li = document.createElement("li");
    li.className = msg.from === currentUser.username ? "text-sm bg-gray-50 p-2 rounded" : "text-sm bg-gray-100 p-2 rounded";
    li.textContent = `${msg.from}: ${msg.text}`;
    messageList.appendChild(li);
  });

  // 9. Create input and send button container
  const inputDiv = document.createElement("div");
  inputDiv.className = "flex gap-2";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Send a message...";
  input.className = "flex-grow border border-gray-300 rounded px-3 py-2 text-sm";

  const sendBtn = document.createElement("button");
  sendBtn.className = "bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700";
  sendBtn.textContent = "Send";

  // 10. Send button handler
  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    
    // Add message to the trade's message array
    trade.messages.push({ from: currentUser.username, text });
    
    // Update the UI
    const newMsgLi = document.createElement("li");
    newMsgLi.className = "text-sm bg-gray-50 p-2 rounded";
    newMsgLi.textContent = `${currentUser.username}: ${text}`;
    messageList.appendChild(newMsgLi);

    input.value = "";

    // Here you should also save your updated trades to localStorage or backend as needed
    saveTrades(allTrades);
  });

  // 11. Append input and button
  inputDiv.appendChild(input);
  inputDiv.appendChild(sendBtn);

  // 12. Append all to content div
  contentDiv.appendChild(messageList);
  contentDiv.appendChild(inputDiv);

  // 13. Append button and content div to container
  container.appendChild(button);
  container.appendChild(contentDiv);

  // 14. Append this accordion to the main container on the page
  const messagesContainer = document.getElementById("messagesContainer");
  messagesContainer?.appendChild(container);
}



export {
    render_messages_init
}

