import { IModule } from '../Iredux'

const CyberSafety = require("./cyber-safety-module.json")

interface IExportedModules {
  [key: string]: IModule
}

const exportedModules: IExportedModules = {
  CyberSafety
}

export default exportedModules