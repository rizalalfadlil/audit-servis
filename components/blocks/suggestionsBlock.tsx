import React from 'react'
import { Panel } from 'primereact/panel'
import { BsStars } from 'react-icons/bs'

export default function SuggestionsBlock() {
  return (
    <div>
        <Panel header={
                <div className="flex items-center gap-4">
                  <BsStars size={24} />
                  <p>Suggestions</p>
                </div>
              }>
            
        </Panel>
    </div>
  )
}
