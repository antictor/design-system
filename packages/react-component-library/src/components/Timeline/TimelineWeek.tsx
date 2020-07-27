import React from 'react'
import classNames from 'classnames'
import { format, differenceInDays, endOfWeek, max, min } from 'date-fns'

import { DATE_WEEK_FORMAT, WEEK_START } from './constants'
import { formatPx, isOdd } from './helpers'
import { withKey } from '../../helpers'
import { TimelineDay } from './context/types'

interface TimelineWeekProps {
  days: TimelineDay[]
  dayWidth: number
  index: number
  render: (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactElement
  startDate: Date
}

function renderDefault(
  index: number,
  isOddNumber: boolean,
  offsetPx: string,
  widthPx: string,
  dayWidth: number,
  daysTotal: number,
  startDate: Date
) {
  const wrapperClasses = classNames(
    'timeline__week',
    'timeline__week--renderDefault',
    {
      'timeline__week--alt': isOddNumber,
    }
  )

  const titleClasses = classNames(
    'timeline__week-title',
    'timeline__week-title--renderDefault'
  )

  return (
    <div
      className={wrapperClasses}
      style={{
        marginLeft: offsetPx,
        width: widthPx,
      }}
      data-testid="timeline-week"
    >
      <span className={titleClasses}>
        {format(startDate, DATE_WEEK_FORMAT)}
      </span>
    </div>
  )
}

export const TimelineWeek: React.FC<TimelineWeekProps> = ({
  days,
  dayWidth,
  index,
  render,
  startDate,
}) => {
  const lastDateDisplayed = min([
    endOfWeek(startDate, { weekStartsOn: WEEK_START }),
    days[days.length - 1].date,
  ])
  const daysTotal = differenceInDays(lastDateDisplayed, startDate) + 1
  const offsetInDays = differenceInDays(
    startDate,
    max([startDate, days[0].date])
  )
  const offsetPx = formatPx(dayWidth, offsetInDays)
  const widthPx = formatPx(dayWidth, daysTotal)

  const isOddNumber = isOdd(index)

  const args = [
    index,
    isOddNumber,
    offsetPx,
    widthPx,
    dayWidth,
    daysTotal,
    startDate,
  ]

  // @ts-ignore
  const child = render ? render(...args) : renderDefault(...args)

  return withKey(child, 'timeline-week', startDate.toString())
}

TimelineWeek.displayName = 'TimelineWeek'
