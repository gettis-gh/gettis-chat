import { 
    initChat, 
    setupChatHotkeys, 
    setupMessageEvents, 
    setupTypingToolbox 
} from "./chat.js";

(async () => await initChat())();
setupMessageEvents();
setupTypingToolbox();
setupChatHotkeys();