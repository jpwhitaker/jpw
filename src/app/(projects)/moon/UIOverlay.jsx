import { Slider, MantineProvider } from "@mantine/core";
import {PHASES} from './Phases'




const UIOverlay = ({ moonPhase, setMoonPhase }) => {

  return (
    <>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
      >
        <div className="absolute inset-0 z-50 flex flex-col justify-end items-center pointer-events-none p-4">
          {/* New Div in Top Right Corner */}
          <div className="absolute top-0 left-0 w-full lg:w-1/4 max-w-full border border-white rounded bg-slate-900/75 pointer-events-auto p-4">
            <div className="text-lg">Moon</div>
            <p>{PHASES[moonPhase - 1].label}</p>
            <p class="text-sm text-gray-300">{PHASES[moonPhase - 1].description}</p>
          </div>

          <div className="w-full px-12 mb-5 pointer-events-auto">
            <PhaseSlider moonPhase={moonPhase} setMoonPhase={setMoonPhase} />
          </div>
        </div>
      </MantineProvider>
    </>
  )
}


const PhaseSlider = ({ moonPhase, setMoonPhase }) => {

  const ANAHULU = [
    { value: 1, label: 'HO‘ONUI (Rising)' },
    { value: 11, label: 'POEPOE (rounding, full)' },
    { value: 21, label: 'EMI (diminishing)' },
  ]

  return (
    <Slider
      label={(val) => {
        console.log(val)
        return (PHASES.find((mark) => mark.value === val).label)
      }}
      labelAlwaysOn
      defaultValue={moonPhase}
      onChange={setMoonPhase}
      size={'lg'}
      step={1}
      min={1}
      max={30}
      marks={PHASES}
      color="rgb(250 250 249)"
      styles={{
        markLabel: { display: 'none' },
        track: {
          '::before': {
            backgroundColor: 'rgb(55 65 81)'
          }
        },
        bar: {
          backgroundColor: 'rgb(100 116 139)'
        },
        thumb: {
          borderColor: 'rgb(100 116 139)',
        },
        mark: {
          borderColor: 'rgb(55 65 81)',
        },
        markFilled: {
          borderColor: 'rgb(100 116 139)',
        }
      }}
    />
  )
}

// const Segmented = () => {
//   return (<SegmentedControl
//     size="sm"
//     data={[
//       { label: 'React', value: 'react' },
//       { label: 'Angular', value: 'ng' },
//       { label: 'Vue', value: 'vue' },
//       { label: 'Svelte', value: 'svelte' },
//     ]}
//     classNames={{
//       root: 'bg-gray-800',
//       label: 'text-gray-400',
//       indicator: 'bg-gray-700'
//     }}
//     styles={(theme) => ({
//       control: {
//         ':not(:first-of-type)': {
//           'border-style': 'solid',
//           'border-width': '0 0 0 0.0625rem',
//           'border-color': `rgb(55 65 81)`,
//         },
//         label: {
//           '&[data-active]': {
//             'color': 'rgb(209 213 219)'
//           },
//           '&[data-active]:hover': {
//             'color': 'rgb(209 213 219)'
//           },
//           '&:hover': {
//             'color': 'rgb(209 213 219)'
//           }
//         }
//       }
//     })}
//   />)
// }

export default UIOverlay;