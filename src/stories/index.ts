import { IModule } from '../Iredux'
const CyberBullying = require("./cyber-bullying-module.json")
const CyberSafety = require("./cyber-safety-module.json")

interface IExportedModules {
  [key: string]: IModule
}

const exportedModules: IExportedModules = {
  CyberSafety,
  CyberBullying
}

export default exportedModules