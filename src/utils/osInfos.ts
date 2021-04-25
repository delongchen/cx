import {
  userInfo,
  homedir,
  hostname,
  release,
  version, platform,
} from 'os'

interface UserInfo {
  uid: number,
  gid: number,
  username: string,
  homedir: string,
  shell: string
}

interface OsInfos {
  homeDir: string,
  platform: string,
  hostName: string,
  release: string,
  version: string,
  userInfo: UserInfo
}

function osInfos(): OsInfos {
  return {
    homeDir: homedir(),
    platform: platform(),
    hostName: hostname(),
    release: release(),
    version: version(),
    userInfo: userInfo() as UserInfo
  }
}
