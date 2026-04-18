// app/courses/course-data.ts
export interface CourseData {
  id: string
  title: string
  tagline: string
  category: string
  level: string
  duration: string
  totalHours: string
  students: number
  rating: number
  reviews: number
  image: string
  instructor: Instructor
  skills: string[]
  price: string
  originalPrice: string
  badge?: string
  lastUpdated: string
  enrolled: number
  language: string
  certificate: boolean
  features: string[]
  whatYouWillLearn: string[]
  requirements: string[]
  projects: Project[]
  curriculum: CurriculumWeek[]
  resources: Resource[]
  faqs: FAQ[]
  videoTrailer?: string
}

export interface Instructor {
  name: string
  role: string
  avatar: string
  experience: string
  students: string
  rating: number
  courses: number
  bio: string
}

export interface Project {
  title: string
  description: string
  skills: string[]
  duration: string
  videoId?: string
}

export interface CurriculumWeek {
  week: number
  title: string
  description?: string
  topics: string[]
  projects?: string[]
  duration: string
  videoHours: string
  videoId?: string
  isPreview?: boolean
}

export interface Resource {
  name: string
  type: string
  size: string
  icon: string
  url?: string
}

export interface FAQ {
  q: string
  a: string
}
