import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="px-8 py-4 w-full max-w-screen-xl mx-auto flex flex-col gap-6 border-t-[1px] border-border-[var(--gray-foreground)] font-geist">
     <div className='flex flex-col justify-between w-full gap-12'>
      <div className='text-lg h-full flex flex-wrap justify-center gap-6'>
        <div className="flex flex-col gap-2 flex-auto">
          <span className='text-[14px] font-semibold'>Increase Your Traffic</span>
          <ul className='flex flex-col text-[14px] text-gray-600'>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Ad Software</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Blog Software</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>SEO Software</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Social Media Software</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 flex-auto">
          <span className='text-[14px] font-semibold'>Connect With Leads</span>
          <ul className='flex flex-col text-[14px] text-gray-600'>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Find New Prospects</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Email Tracking</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Sales Email Templates</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Click to Call Your Leads</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Email Marketing</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 flex-auto">
          <span className='text-[14px] font-semibold'>Close and Manage Leads</span>
          <ul className='flex flex-col text-[14px] text-gray-600'>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Document Tracking Tool</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Meeting Schedule Tool</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Sales Automation Tool</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Lead Management Tool</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 flex-auto">
          <span className='text-[14px] font-semibold'>Support and Tools</span>
          <ul className='flex flex-col text-[14px] text-gray-600'>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Hubspot Partners</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Join a Local User Group</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Get a Free Website Report</a></li>
          </ul>
        </div>
      </div>
      <div className='text-[12px] flex items-center justify-center gap-12'>
        <ul className='text-[12px] flex gap-12 text-gray-600'>
          <li><a href="#" className='text-[var(--hover-text)]'>English (English)</a></li>
          <li><a href="#" className='hover:text-[var(--hover-text)]'>Español (Spanish)</a></li>
          <li><a href="#" className='hover:text-[var(--hover-text)]'>Français (French)</a></li>
          <li><a href="#" className='hover:text-[var(--hover-text)]'>Deutsch (German)</a></li>
          <li><a href="#" className='hover:text-[var(--hover-text)]'>中文 (Chinese - Simplified)</a></li>
          <li><a href="#" className='hover:text-[var(--hover-text)]'>العربية (Arabic)</a></li>
        </ul>
      </div>
      <div className='text-[12px] flex items-center justify-between gap-12 w-full'>
        <div className='flex flex-auto justify-start'>
          <span>LOGO</span>
        </div>
        <div className='flex flex-auto justify-center'>
          <span>@2025</span>
        </div>
        <div className='flex flex-auto justify-end'>
          <ul className='text-[12px] flex gap-12 text-gray-600'>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Legal Stuff</a></li>
            <li><a href="#" className='hover:text-[var(--hover-text)]'>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
     </div>
    </footer>
  )
}
