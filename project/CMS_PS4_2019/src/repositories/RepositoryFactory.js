import SettingRepository from '@/repositories/settingRepository'

const repositories = {
  setting: SettingRepository
}

export default {
  get: name => repositories[name]
}
