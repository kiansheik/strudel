/*
  @title Chortle
  @by taco_chip
  @details first time using strudel
*/

var basedrum_volume = slider(0.57,0,5,0.01)
var synth_volume = slider(0.26,0,0.7,0.01)
var basedrum_delay = slider(0.05,0,0.05,0.01)

let cpm = 120/4;
let bass_drum = arrange(
  [2, "<[bd -] [- - bd bd] [- bd] [-]>*4"],
)
  .sound().bank("RolandTR808").gain(basedrum_volume).delay(basedrum_delay);



// section 1: intro
let lead_synth = arrange(
  [1, "<[[0 ,3, 12] - - - [2 ,6, 12] -] [3, 2, 2] >!4"],
  [1, "<[[-6 ,-3, 6] - - -  [-9, 7, 2] -] [14 ,20, 12] >!4"],
  [1, "<[[-6 ,4, -2] - - -  [-9, 0, 2] -] [-6 ,-3, 6] >!4"],
)
  .scale("<D:minor <D:minor F:major>>")
  .note()
  .sound("sawtooth")
  .attack(0).decay(.25).sustain(0).release(.3)
  .lpf(3000).lpq(0).lpenv(3).lpa(0).lpd(.55).lps(10)
  .delay(.2).delaytime(.1).delayfeedback(.1).vib(0.01).tremolo(0.2)
  .gain(synth_volume)
  ;

let rim = arrange(
 [ 3, s("<[bd - rim -]*3>/3").gain(basedrum_volume)],
 [ 3, s("<[bd rim]*3>/3").gain(basedrum_volume)],
)

let hihat = arrange(
  [1, s("- [- -] - - [sd -] -")],
  [1, s("- [- sd] - - [- -] -")],
  [1, s("sd [- -] - - [- sd] -")],
).lpf(300).lpd(.2).lps(1).gain(0.2)

// section 5: bumpin' that
let bass_modified = arrange(
  [1, "<[[2 ] - 0 - [0 ] -] [3] >!4"],
  [1, "<[[3] - 3 -  [0] -] [14] >!4"],
  [1, "<[[4] - 5 -  [2] -] [-6] >!4"],
)
  .scale("<D:minor F:major>")
  .add(12*3)
  .note().sound("gm_synth_bass_2:0")
  .attack(0).decay(.5).release(.3)
  .lpf(1800).gain(0.3);

let drum_loop = stack(
    sound("hh*4"),
    rim,
    hihat
  )

let wav_melody = arrange(
  [1, "[0, 2, 4, 0] - - [0, 2, 4, 0]"],
  [2, "0 2 4 0".add(12)],
  [1, "[14 [- -] <14 ->]*4"],
  [1, "[10 [- -] <12 10>]*4"],
  [1, "[10 [- -] <12 9>]*4"],
  ).scale("D:minor")
  .note()
  .sound("triangle")
  .attack(0)
  .lpf(1000)
  .gain("<[0.3 - - 0.2] 0.2 0.3 0.4 [0.3 0.4] 0.6>");
  

let section_1 = stack(
    drum_loop,
  //   lead_synth,
  // wav_melody,
  // bass_modified,
    )


let section_2 = stack(
    drum_loop,
  //   lead_synth,
  // wav_melody,
  bass_modified,
    )


let section_3 = stack(
    drum_loop,
    lead_synth,
  // wav_melody,
  bass_modified,
    )


let section_4 = stack(
    drum_loop,
    lead_synth,
  wav_melody,
  bass_modified,
    )

let cover = arrange(
  [2, section_1],
  [4, section_2],
  [12, section_3],
  [24, section_4],
    [2, section_2],
  [2, section_1],
   
  
)

arrange(
  [32, cover],
  // [8, stack(section_5_ext, remix_vox.lpf("<1500 1500 1500 1500 1500 1500 1500 2000>"))],
  // [8, stack(section_6)],
  // [4, stack(section_7)],
  // [4, stack(section_8, vox_chop_3.lpf("<600 1000 1350 0>").mask("<1 1 1 0>"))],
  // [8, stack(
  //   section_9, 
  //   vox_chop_4.mask("<[1 0] [1 0] [1 0] [1 0]>/2"), 
  //   vox_chop_5.mask("<[0 1] [0 1] [0 1] [0 0]>/2"), 
  //   vox_chop_6.lpf(1500).lpa(.25).lpd(.25).pan(sine).mask("<[0 0] [0 0] [0 0] [0 1]>/2"), 
  //   vox_chop_2.mask("<0 1>/4")
  // )],
  // [8, stack(section_5, remix_vox.mask("<1 1 1 0 1 1 1 1>"))],
  // [4, vox_chop_1.delay(.25).delayt(.5).dfb(.2).mask("<1 0 0 0>")]
)
  .cpm(cpm)
  .theme("greenText")
  // .color("<[#99CC3E #FFFFFF] [#99CC3E #000000]>")
  // .fontFamily("x3270")
  .punchcard({
    vertical: 1, flipTime: 1, fold: 0, stroke: 1,
    playheadColor: 'rgba(0, 0, 0, 0)'
  });