import { Slider, MantineProvider } from "@mantine/core"



const UIOverlay = ({ moonPhase, setMoonPhase }) => {
  return (
    <>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
        >
          <div className="overlay">
            <div className="segmented-container w-full px-12">
              <PhaseSlider moonPhase={moonPhase} setMoonPhase={setMoonPhase} />
            </div>
          </div>
        </MantineProvider>
    </>
  )
}

const PhaseSlider = ({ moonPhase, setMoonPhase }) => {
  const PHASES = [
    { value: 1, label: 'Hilo' },
    { value: 2, label: 'Hoaka' },
    { value: 3, label: 'Kukahi' },
    { value: 4, label: 'Kulua' },
    { value: 5, label: 'Kukolu' },
    { value: 6, label: 'Kupau' },
    { value: 7, label: '‘Olekukahi' },
    { value: 8, label: '‘Olekulua' },
    { value: 9, label: '‘Olekukolu' },
    { value: 10, label: '‘Olepau' },
    { value: 11, label: 'Huna' },
    { value: 12, label: 'Mohalu' },
    { value: 13, label: 'Hua' },
    { value: 14, label: 'Akua' },
    { value: 15, label: 'Hoku' },
    { value: 16, label: 'Mahealani' },
    { value: 17, label: 'Kulu' },
    { value: 18, label: 'La‘aukukahi' },
    { value: 19, label: 'La‘aukulua' },
    { value: 20, label: 'La‘aupau' },
    { value: 21, label: '‘Olekukahi' },
    { value: 22, label: '‘Olekulua' },
    { value: 23, label: '‘Olepau' },
    { value: 24, label: 'Kaloakukahi' },
    { value: 25, label: 'Kaloakulua' },
    { value: 26, label: 'Kaloapau' },
    { value: 27, label: 'Kane' },
    { value: 28, label: 'Lono' },
    { value: 29, label: 'Mauli' },
    { value: 30, label: 'Muku' }
  ];

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