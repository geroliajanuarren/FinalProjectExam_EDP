import create from "zustand";
import {persist} from "zustand/middleware";

let app = (set) =>({
    Nopen: true,
    updateOpen:(Nopen) => set((state) => ({Nopen:Nopen})),
})

app = persist(app, {name:"my_app"});
export const UseApp = create(app);