import React from 'react'
import styled from 'styled-components'
import { selectors } from '@royalnavy/design-tokens'
import { findIndex } from 'lodash'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import { TimelineProvider } from './context'

import {
  TimelineDays,
  TimelineDaysProps,
  TimelineHours,
  TimelineHoursProps,
  TimelineMonths,
  TimelineMonthsProps,
  TimelineRows,
  TimelineRowsProps,
  TimelineSide,
  TimelineSideProps,
  TimelineTodayMarker,
  TimelineTodayMarkerProps,
  TimelineWeeks,
  TimelineWeeksProps,
} from '.'

import { TimelineOptions } from './context/types'
import {
  DEFAULTS,
  TIMELINE_BORDER_COLOR,
  TIMELINE_ROW_HEADER_WIDTH,
  TIMELINE_SCALES,
} from './constants'
import { TimelineScaling } from './TimelineScaling'

type timelineRootChildrenType = React.ReactElement<TimelineSideProps>

type timelineHeadChildrenType =
  | React.ReactElement<TimelineTodayMarkerProps>
  | React.ReactElement<TimelineMonthsProps>
  | React.ReactElement<TimelineWeeksProps>
  | React.ReactElement<TimelineDaysProps>

type timelineBodyChildrenType = React.ReactElement<TimelineRowsProps>

type timelineChildrenType =
  | timelineRootChildrenType
  | timelineHeadChildrenType
  | timelineBodyChildrenType

export interface TimelineProps extends ComponentWithClass {
  children: timelineChildrenType | timelineChildrenType[]
  dayWidth?: number
  hasSide?: boolean
  startDate?: Date
  endDate?: Date
  today?: Date
  range?: number
  unitWidth?: number
}

function extractChildren(
  children: timelineChildrenType | timelineChildrenType[],
  types: React.ReactElement['type'][],
  inverse?: boolean
) {
  return (children as []).filter((child: React.ReactElement) => {
    return inverse ? !types.includes(child?.type) : types.includes(child?.type)
  })
}

function hasTimelineSideComponent(
  children: timelineChildrenType | timelineChildrenType[]
) {
  const sideChildren = extractChildren(children, [TimelineSide])

  if (!sideChildren.length) {
    return false
  }

  console.warn('Component `TimelineSide` is deprecated')
  return true
}

function getHoursBlockSize(
  children: timelineChildrenType | timelineChildrenType[]
) {
  const hoursChildren = extractChildren(children, [TimelineHours])

  if (!hoursChildren.length) {
    return null
  }

  return (
    (hoursChildren[0] as React.ReactElement<TimelineHoursProps>).props
      .blockSize || DEFAULTS.HOURS_BLOCK_SIZE
  )
}

function getDayWidth(
  hoursBlockSize: number,
  dayWidth: number,
  unitWidth: number
) {
  const multiplier = hoursBlockSize ? 24 / hoursBlockSize : 1

  if (dayWidth) {
    console.warn('Prop `dayWidth` is deprecated')
  }

  return (dayWidth || unitWidth || DEFAULTS.UNIT_WIDTH) * multiplier
}

const { color, spacing } = selectors

const StyledTimeline = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${color('neutral', 'white')};
`

interface StyledInnerProps {
  hasSide: boolean
}

const StyledInner = styled.div<StyledInnerProps>`
  overflow-y: hidden;
  border-right: ${spacing('px')} solid ${TIMELINE_BORDER_COLOR};
  border-bottom: ${spacing('px')} solid ${TIMELINE_BORDER_COLOR};
  margin-left: ${({ hasSide }) =>
    hasSide ? TIMELINE_ROW_HEADER_WIDTH : 'initial'};
`

const StyledHeader = styled.div``

export const Timeline: React.FC<TimelineProps> = ({
  children,
  dayWidth,
  hasSide,
  startDate,
  endDate,
  today,
  range,
  unitWidth,
}) => {
  const scaleIndex = findIndex(TIMELINE_SCALES, 'default')
  const hoursBlockSize = TIMELINE_SCALES[scaleIndex].hoursBlockSize
  // const hoursBlockSize = getHoursBlockSize(children)
  const options: TimelineOptions = {
    hoursBlockSize,
    dayWidth: getDayWidth(hoursBlockSize, dayWidth, unitWidth),
    unitWidth: unitWidth || DEFAULTS.UNIT_WIDTH,
    rangeInMonths: range || DEFAULTS.RANGE_IN_MONTHS,
    scaleIndex: findIndex(TIMELINE_SCALES, 'default')
  }

  const rootChildren = extractChildren(
    children,
    [
      TimelineDays,
      TimelineHours,
      TimelineMonths,
      TimelineRows,
      TimelineSide,
      TimelineTodayMarker,
      TimelineWeeks,
    ],
    true
  )

  const hasTimelineSide = hasTimelineSideComponent(children)

  const headChildren = extractChildren(children, [
    TimelineDays,
    TimelineHours,
    TimelineWeeks,
    TimelineMonths,
    TimelineTodayMarker,
  ])

  const bodyChildren = extractChildren(children, [TimelineRows])

  return (
    <TimelineProvider
      endDate={endDate}
      hasSide={hasSide || hasTimelineSide}
      options={options}
      startDate={startDate}
      today={today}
    >
      <TimelineScaling />
      <StyledTimeline className="timeline" data-testid="timeline" role="grid">
        <StyledInner
          className="timeline__inner"
          hasSide={hasSide || hasTimelineSide}
        >
          {rootChildren}
          <StyledHeader
            className="timeline__header"
            data-testid="timeline-header"
            role="rowgroup"
          >
            {headChildren}
          </StyledHeader>
          {bodyChildren}
        </StyledInner>
      </StyledTimeline>
    </TimelineProvider>
  )
}

Timeline.displayName = 'Timeline'
