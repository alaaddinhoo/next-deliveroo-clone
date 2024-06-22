import Image from 'next/image'
import React from 'react'

export function GoogleDownloadButton() {
  return (
        <button type="button" className="relative flex items-center justify-center w-48 mt-3 rounded-lg h-14">
            <Image fill src={"https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"} alt=''/>
        </button>
  )
}