import { useState, useEffect } from "react";
import { Slider, Accordion, MantineProvider } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PHASES } from './Phases'
import Modal from './Modal'

const UIOverlay = ({ moonPhase, setMoonPhase }) => {
  const [open, setOpen] = useState(false);

  // Hook to set the opacity to 1 after DOM content is loaded
  useEffect(() => {
    const overlay = document.getElementById('overlay-div');
    if (overlay) {
      overlay.style.opacity = '1';
    }
  }, []);

  return (
    <div
      id="overlay-div"
      style={{
        opacity: 0,
        transition: 'opacity 0.5s'
      }}
    >
      <Modal open={open} setOpen={setOpen} />
      <MantineProvider
        // withNormalizeCSS
        // withGlobalStyles
      >
        <div className="absolute inset-0 z-50 pointer-events-none p-4">
          <div className="flex flex-col justify-between h-full p-4">

            <div className="flex self-start w-full justify-between">
              <div className=" w-full   lg:w-1/4 border border-gray-500  rounded bg-slate-900/75 pointer-events-auto">
                <Accordion unstyled
                  className="h-full"
                  chevron={<IconPlus size="1.2rem" />}
                  styles={{
                    
                    control: {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      '-webkit-tap-highlight-color': 'transparent',

                    },
                    label: {
                      flex: 1
                    },
                    chevron: {
                      // styles added to chevron when it should rotate
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: 0,
                      transitionDuration: '0.2s',
                      transform: 'rotate(-90deg)',
                      '&[data-rotate]': {
                        transform: 'rotate(-45deg)',
                      },
                    },
                  }}
                >
                  <Accordion.Item value="customization">
                    <Accordion.Control
                      className="px-4 my-4">
                      <div className="text-xl text-left ">{PHASES[moonPhase - 1].label}</div>
                    </Accordion.Control>
                    <Accordion.Panel
                      className="max-h-[50vh] px-4 pb-4 overflow-auto">
                      <div className="text-sm text-gray-300 leading-normal overflow-y-auto  h-full [&>p]:mb-2 [&>hr]:my-4 [&>hr]:mb-4 divide-gray-500">{PHASES[moonPhase - 1].description}</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="h-[3.75rem] w-[3.75rem] flex justify-end">
                <InformationCircleIcon className="self-center my-0 h-6 w-6 text-gray-400 hover:text-gray-300 cursor-pointer pointer-events-auto" onClick={() => { setOpen(true) }} />
              </div>

            </div>

            {/* Slider at the bottom */}
            <div className="self-center w-full px-0 lg:px-12 mb-0 pointer-events-auto" >
              <PhaseSlider moonPhase={moonPhase} setMoonPhase={setMoonPhase} />
            </div>
          </div>
        </div>



      </MantineProvider>
    </div>
  )
}


const PhaseSlider = ({ moonPhase, setMoonPhase }) => {
  const [sliderSize, setSliderSize] = useState('xl');

  useEffect(() => {
    const updateSliderSize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setSliderSize('lg');
      } else {
        setSliderSize(12);
      }
    };

    updateSliderSize();

    window.addEventListener('resize', updateSliderSize);

    return () => window.removeEventListener('resize', updateSliderSize);
  }, []);

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
      className=""
      labelAlwaysOn
      defaultValue={moonPhase}
      onChange={setMoonPhase}
      size={sliderSize}
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