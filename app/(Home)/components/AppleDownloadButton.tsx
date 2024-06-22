import Image from 'next/image'
import React from 'react'

export function AppleDownloadButton() {
  return (
        <button type="button" className="relative flex items-center justify-center w-48 mt-3 ">
            <Image fill src={"https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"} alt=''/>
        </button>
  )
}