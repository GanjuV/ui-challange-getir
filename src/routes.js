import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import TodayView from 'src/views/today';
import UpcomingView from 'src/views/upcoming';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/today', element: <TodayView /> },
      { path: 'upcoming', element: <UpcomingView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
