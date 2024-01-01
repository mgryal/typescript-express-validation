import express from 'express'
import * as diaryService from '../services/diary'
import toNewDiaryEntry from '../utils/diary'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryService.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))
  return diary != null ? res.send(diary) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedDiaryEntry = diaryService.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error.'
    res.status(400).send(message)
  }
})

export default router
