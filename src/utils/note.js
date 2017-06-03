import {
  logger
} from '@xhs/launcher'

export function getNoteUri(note) {
  if (!note || !note.id) {
    logger.error(`could not found the id from note`)
    return ''
  }

  return `//m.xiaohongshu.com/discovery/item/${note.id}`
}
