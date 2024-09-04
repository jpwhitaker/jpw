import { useState, useEffect } from "react";
import { Slider, Accordion, MantineProvider } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PHASES } from './Phases'
import Modal from './Modal'
import localFont from 'next/font/local'
import { Montserrat } from "next/font/google";

const yamas = localFont({
  src: '../../../../public/TAYYamas.woff',
  display: 'swap',
  variable: '--font-yamas',
})

const montserrat = Montserrat({ subsets: ["latin"] });


const UIOverlay = ({ moonPhase, setMoonPhase }) => {
  const [open, setOpen] = useState(false);

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
      <MantineProvider>
        <div className="absolute inset-0 z-50 pointer-events-none p-4">
          <div className="flex flex-col justify-between h-full p-4">
            {/* Info Icon positioned absolutely */}
            <div className="absolute top-4 right-4 z-50">
              <InformationCircleIcon 
                className="h-9 w-9 text-gray-400 mt-8 mr-4 hover:text-gray-300 cursor-pointer pointer-events-auto" 
                onClick={() => { setOpen(true) }} 
              />
            </div>

            <div className="flex self-start w-full">
              <div className="w-full lg:w-2/3 xl:w-1/4 pointer-events-auto">
                <Accordion unstyled
                  defaultValue={['customization']}
                  className="h-full"
                  chevron={<IconPlus size="1.8rem" />}
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
                      display: 'none',
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
                    <Accordion.Control className="px-4 my-4">
                      <div className={`${yamas.variable} font-yamas text-8xl text-left tracking-wide text-slate-500`}>
                        {PHASES[moonPhase - 1].label.toLocaleLowerCase()}
                      </div>
                    </Accordion.Control>
                    <Accordion.Panel className="px-6 pb-6 bg-black bg-opacity-40 backdrop-blur-md rounded-md">
                      <div className={`${montserrat.className} text-lg leading-relaxed tracking-wide font-light text-slate-300 overflow-y-auto h-full [&>p]:mb-2 [&>hr]:my-4 [&>hr]:mb-4 divide-gray-500`}>
                        {PHASES[moonPhase - 1].description}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

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


export default UIOverlay;