import { RouteObject } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { ContactPage } from './ContactPage'
import { LawyerListPage } from './LawyerListPage'
import { PostsPage } from './PostsPage'
import { ProductsPage } from './ProductsPage'
import { EnginesPage } from './EnginesPage'
import { EngineDetailsPage } from './EngineDetailsPage'
import { EngineBuilderPage } from './EngineBuilderPage'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/lawyers',
    element: <LawyerListPage />,
  },
  {
    path: '/posts',
    element: <PostsPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/engines',
    element: <EnginesPage />,
  },
  {
    path: '/engines/:id',
    element: <EngineDetailsPage />,
  },
  {
    path: '/engine-builder',
    element: <EngineBuilderPage />,
  },
]

