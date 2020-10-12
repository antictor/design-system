import React from 'react'
import { format } from 'date-fns'
import { Meta } from '@storybook/react/types-6-0'
import {
  ColorDanger500,
  ColorWarning500,
  ColorAction500,
} from '@royalnavy/design-tokens'

import {
  Timeline,
  TimelineEvent,
  TimelineEvents,
  TimelineHours,
  TimelineRow,
  TimelineRows,
  TimelineTodayMarker,
  TimelineMonths,
  TimelineWeeks,
  TimelineDays,
  TimelineSide,
} from '.'
import { TIMELINE_BLOCK_SIZE } from './constants'

export default { component: Timeline, title: 'Timeline' } as Meta

const disableScrollableRegionFocusableRule = {
  a11y: {
    config: {
      rules: [
        {
          id: 'scrollable-region-focusable',
          enabled: false,
        },
      ],
    },
  },
}

export const NoData = () => (
  <Timeline startDate={new Date(2020, 0, 1)} today={new Date(2020, 0, 15)}>
    <TimelineTodayMarker />
    <TimelineMonths />
    <TimelineWeeks />
    <TimelineDays />
    <TimelineRows>{}</TimelineRows>
  </Timeline>
)
NoData.parameters = disableScrollableRegionFocusableRule
NoData.storyName = 'No data'

export const BoundByFixedDates = () => (
  <Timeline
    startDate={new Date(2020, 0, 13)}
    endDate={new Date(2020, 1, 15)}
    today={new Date(2020, 0, 15)}
  >
    <TimelineTodayMarker />
    <TimelineMonths />
    <TimelineWeeks />
    <TimelineDays />
    <TimelineRows>{}</TimelineRows>
  </Timeline>
)
BoundByFixedDates.parameters = disableScrollableRegionFocusableRule
BoundByFixedDates.storyName = 'Bound by fixed dates'

export const WithData = () => (
  <Timeline startDate={new Date(2020, 3, 1)} today={new Date(2020, 3, 15, 12)}>
    <TimelineTodayMarker />
    <TimelineMonths />
    <TimelineWeeks />
    <TimelineDays />
    <TimelineRows>
      <TimelineRow name="Row 1">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 14, 12)}
            endDate={new Date(2020, 3, 18, 12)}
          >
            Event 1
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
      <TimelineRow name="Row 2">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 3)}
            endDate={new Date(2020, 3, 8)}
          >
            Event 2
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
    </TimelineRows>
  </Timeline>
)
WithData.parameters = disableScrollableRegionFocusableRule
WithData.storyName = 'With data'

export const WithSidebar = () => (
  <Timeline
    hasSide
    startDate={new Date(2020, 3, 1)}
    today={new Date(2020, 3, 15)}
  >
    <TimelineTodayMarker />
    <TimelineMonths />
    <TimelineWeeks />
    <TimelineDays />
    <TimelineRows>
      <TimelineRow name="Row 1">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 14)}
            endDate={new Date(2020, 3, 18)}
          >
            Event 1
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
      <TimelineRow name="Row 2">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 3)}
            endDate={new Date(2020, 3, 8)}
          >
            Event 2
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
    </TimelineRows>
  </Timeline>
)
WithSidebar.storyName = 'With sidebar'

export const WithHours = () => (
  <Timeline
    hasSide
    startDate={new Date(2020, 3, 1)}
    today={new Date(2020, 3, 15)}
  >
    <TimelineTodayMarker />
    <TimelineMonths />
    <TimelineWeeks />
    <TimelineDays />
    <TimelineHours blockSize={TIMELINE_BLOCK_SIZE.QUARTER_DAY} />
    <TimelineRows>
      <TimelineRow name="Row 1">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 5, 6, 0, 0)}
            endDate={new Date(2020, 3, 7, 18, 0, 0)}
          >
            Event 1
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
      <TimelineRow name="Row 2">
        <TimelineEvents>
          <TimelineEvent
            startDate={new Date(2020, 3, 3, 12, 0, 0)}
            endDate={new Date(2020, 3, 6, 12, 0, 0)}
          >
            Event 2
          </TimelineEvent>
        </TimelineEvents>
      </TimelineRow>
    </TimelineRows>
  </Timeline>
)
WithHours.storyName = 'With hours'

export const WithCustomMonths = () => {
  const CustomTimelineMonth = (
    index: number,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => {
    return (
      <span
        style={{
          display: 'inline-block',
          width: `${dayWidth * daysTotal}px`,
          height: '4rem',
          backgroundColor: 'black',
          color: 'white',
          borderLeft: '1px solid white',
          paddingLeft: '.5rem',
        }}
      >
        {format(startDate, 'MMMM yyyy')}
      </span>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths render={CustomTimelineMonth} />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>{}</TimelineRows>
    </Timeline>
  )
}
WithCustomMonths.storyName = 'With custom months'

export const WithCustomWeeks = () => {
  const CustomTimelineWeek = (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => {
    return (
      <span
        style={{
          display: 'inline-block',
          marginLeft: offsetPx,
          width: widthPx,
          height: '2.5rem',
          backgroundColor: `${isOddNumber ? 'black' : 'white'}`,
          color: `${isOddNumber ? 'white' : 'black'}`,
          borderTop: '1px solid black',
          borderBottom: '1px solid black',
          paddingLeft: '.5rem',
        }}
      >
        {format(startDate, 'dd/MM')}
      </span>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks render={CustomTimelineWeek} />
      <TimelineDays />
      <TimelineRows>{}</TimelineRows>
    </Timeline>
  )
}
WithCustomWeeks.storyName = 'With custom weeks'

export const WithCustomDays = () => {
  const CustomTimelineDays = (index: number, dayWidth: number, date: Date) => {
    return (
      <span
        style={{
          display: 'inline-block',
          width: `${dayWidth}px`,
          height: '2.5rem',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        {format(date, 'dd')}
      </span>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays render={CustomTimelineDays} />
      <TimelineRows>{}</TimelineRows>
    </Timeline>
  )
}
WithCustomDays.storyName = 'With custom days'

export const WithCustomHours = () => {
  const CustomTimelineHours = (width: number, time: string) => {
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: '2.5rem',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <span style={{ fontSize: '8px', paddingLeft: '5px' }}>{time}</span>
      </div>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineHours render={CustomTimelineHours} />
      <TimelineRows>{}</TimelineRows>
    </Timeline>
  )
}
WithCustomHours.storyName = 'With custom hours'

export const WithCustomTodayMarker = () => {
  const CustomTodayMarker = (date: Date, offset: string) => {
    return (
      <span
        className="rn_text-s"
        style={{
          position: 'absolute',
          left: offset,
          height: '100vh',
          width: '2px',
          background: 'black',
          overflow: 'visible',
          whiteSpace: 'nowrap',
          textIndent: '1rem',
          zIndex: 1,
        }}
      >
        {date.toString()}
      </span>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker render={CustomTodayMarker} />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>{}</TimelineRows>
    </Timeline>
  )
}
WithCustomTodayMarker.storyName = 'With custom today marker'

export const WithCustomColumns = () => {
  const CustomTimelineColumn = (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string
  ) => {
    return (
      <div
        style={{
          display: 'inline-block',
          width: widthPx,
          marginLeft: offsetPx,
          backgroundColor: `${isOddNumber ? 'black' : 'white'}`,
          height: '100vh',
        }}
      />
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows renderColumns={CustomTimelineColumn}>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 14)}
              endDate={new Date(2020, 3, 18)}
            >
              Event 1
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 2">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 3)}
              endDate={new Date(2020, 3, 8)}
            >
              Event 2
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
WithCustomColumns.storyName = 'With custom columns'

export const WithCustomEventBarColor = () => {
  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              barColor={ColorDanger500}
              startDate={new Date(2020, 3, 14)}
              endDate={new Date(2020, 3, 18)}
            >
              Event 1
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
WithCustomEventBarColor.storyName = 'With custom event bar color'

export const WithCustomEventContent = () => {
  const CustomEvent = ({
    children,
    startDate,
    endDate,
    widthPx,
    offsetPx,
    ...rest
  }: {
    children: React.ReactNode
    startDate: Date
    endDate: Date
    widthPx: string
    offsetPx: string
  }) => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'black',
          color: 'white',
          marginLeft: offsetPx,
          width: widthPx,
        }}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 6)}
              endDate={new Date(2020, 3, 10)}
              render={(
                startDate: Date,
                endDate: Date,
                widthPx: string,
                offsetPx: string
              ) => {
                return (
                  <CustomEvent
                    startDate={startDate}
                    endDate={endDate}
                    widthPx={widthPx}
                    offsetPx={offsetPx}
                  >
                    Event 1
                  </CustomEvent>
                )
              }}
            />
            <TimelineEvent
              startDate={new Date(2020, 3, 16)}
              endDate={new Date(2020, 3, 20)}
              render={(
                startDate: Date,
                endDate: Date,
                widthPx: string,
                offsetPx: string
              ) => {
                return (
                  <CustomEvent
                    startDate={startDate}
                    endDate={endDate}
                    widthPx={widthPx}
                    offsetPx={offsetPx}
                  >
                    Event 2
                  </CustomEvent>
                )
              }}
            />
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 2">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 15)}
              endDate={new Date(2020, 3, 19)}
            >
              Event 3
            </TimelineEvent>
            <TimelineEvent
              startDate={new Date(2020, 3, 22)}
              endDate={new Date(2020, 3, 24)}
            >
              Event 4
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
WithCustomEventContent.storyName = 'With custom event content'

export const WithCustomDayWidth = () => {
  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
      unitWidth={75}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 25)}
              endDate={new Date(2020, 3, 28)}
            >
              Event 2
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 2">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 22)}
              endDate={new Date(2020, 3, 24)}
            >
              Event 4
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
WithCustomDayWidth.storyName = 'With custom day width'

export const WithCustomRange = () => {
  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
      range={6}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineRows>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 25)}
              endDate={new Date(2020, 3, 28)}
            >
              Event 2
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 2">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 22)}
              endDate={new Date(2020, 3, 24)}
            >
              Event 4
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
WithCustomRange.storyName = 'With custom range'

export const Spike = () => {
  return (
    <Timeline
      hasSide
      startDate={new Date(2020, 3, 1)}
      today={new Date(2020, 3, 15)}
      range={6}
    >
      <TimelineTodayMarker />
      <TimelineMonths />
      <TimelineWeeks />
      <TimelineDays />
      <TimelineHours />
      <TimelineRows>
        <TimelineRow name="Row 1">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 3)}
              endDate={new Date(2020, 3, 4)}
            >
              Event 1
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 2">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 4)}
              endDate={new Date(2020, 3, 10)}
            >
              Event 2
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 3">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 2)}
              endDate={new Date(2020, 3, 5)}
            >
              Event 3
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 4">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 1)}
              endDate={new Date(2020, 3, 10)}
            >
              Event 4
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 5">
          <TimelineEvents>
            <TimelineEvent
              startDate={new Date(2020, 3, 3)}
              endDate={new Date(2020, 3, 5)}
            >
              Event 5
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
        <TimelineRow name="Row 6">
          <TimelineEvents>
            <TimelineEvent
              barColor={ColorDanger500}
              startDate={new Date(2020, 3, 3)}
              endDate={new Date(2020, 3, 5)}
            >
              Event 6
            </TimelineEvent>
            <TimelineEvent
              barColor={ColorAction500}
              startDate={new Date(2020, 3, 6)}
              endDate={new Date(2020, 3, 8)}
            >
              Event 7
            </TimelineEvent>
            <TimelineEvent
              barColor={ColorAction500}
              startDate={new Date(2020, 3, 13)}
              endDate={new Date(2020, 3, 15)}
            >
              Event 8
            </TimelineEvent>
            <TimelineEvent
              barColor={ColorAction500}
              startDate={new Date(2020, 3, 20)}
              endDate={new Date(2020, 3, 22)}
            >
              Event 9
            </TimelineEvent>
            <TimelineEvent
              barColor={ColorAction500}
              startDate={new Date(2020, 3, 27)}
              endDate={new Date(2020, 3, 29)}
            >
              Event 10
            </TimelineEvent>
            <TimelineEvent
              barColor={ColorAction500}
              startDate={new Date(2020, 4, 3)}
              endDate={new Date(2020, 4, 5)}
            >
              Event 11
            </TimelineEvent>
          </TimelineEvents>
        </TimelineRow>
      </TimelineRows>
    </Timeline>
  )
}
Spike.storyName = 'Spike'
