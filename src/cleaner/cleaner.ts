interface CleanerService {
  (data: string, filename: string): CleanData[]
}

interface CleanData {
  id: string,
  date: Date,
  price: number,
  title: string
}


export {CleanData, CleanerService}