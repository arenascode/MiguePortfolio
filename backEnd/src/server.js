import { app } from "./app/app.js";
import { PORT } from "./config/server.config.js";

app.listen(PORT, () => console.log(`Listening in ${PORT}`))
// export default connectedServer