import { ElectronAPI } from '@electron-toolkit/preload'
import { PatientFormData } from '../renderer/src/models/interfaces'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      savePatients: (patients: PatientFormData[]) => Promise<void>
    }
  }
}
