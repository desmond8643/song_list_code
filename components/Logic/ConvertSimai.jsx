export default function ConvertSimai(rhythm, measure, duration, maidata) {
  const parts = []
  const commasDuration = 384 / parseInt(rhythm)
  const ma2 = []

  let currentMeasure = parseInt(measure)
  let currentDuration = parseInt(duration)

  let currentPart = ""

  for (let i = 0; i < maidata.length; i++) {
    const char = maidata[i]

    if (char === ",") {
      if (currentPart.length !== 0) {
        parts.push(currentPart)
      }
      parts.push(",")
      currentPart = ""
    } else if (char === "`") {
      if (currentPart.length !== 0) {
        parts.push(currentPart)
      }
      parts.push("`")
      currentPart = ""
    } else {
      currentPart += char
    }
  }

  if (currentPart.length !== 0) {
    parts.push(currentPart)
  }

  console.log(parts)
  console.log(`commas: ${commasDuration}`)
  console.log(`currentDuration: ${currentDuration}`)
  console.log(`currentMeasure: ${currentMeasure}`)

  // initial first note
  firstNote()

  for (let i = 1; i < parts.length; i++) {
    const previousNote = parts[i - 1]
    const note = parts[i] 
    console.log(note)
    // commas case
    if (note === "," || note === "`") {
      if (note === ",") {
        currentDuration += commasDuration
      }
      if (note === "`") {
        currentDuration++
      }
      if (currentDuration > 384) {
        currentDuration -= 384
        currentMeasure++
      }
      continue
    }

    checkCases(note)

    if (previousNote === "`") {
      currentDuration--
      if (currentDuration < 0) {
        currentDuration += 384
        currentMeasure--
      }
    }
  }

  ma2.push(["", currentMeasure, currentDuration, "", "", "", "", ""])
  console.log(ma2)
  return ma2

  function firstNote() {
    if (parts[0] === ",") {
      currentDuration += commasDuration
      if (currentDuration > 384) {
        currentDuration -= 384
        currentMeasure++
      }
      return
    }

    checkCases(parts[0])
  }

  function handleShortSCCase(note) {
    let b = false

    const splitSlide = note
      .replace("^", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")

    console.log(splitSlide)
    const initialNote = parseInt(splitSlide[0]) - 1
    if (splitSlide[0].includes("b")) {
      b = true
    }

    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseInt(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm
    let slideNoteType = ""

    const strNoteType = b ? "BRSTR" : "NMSTR"

    const strNote = [
      strNoteType,
      currentMeasure,
      currentDuration,
      initialNote,
      "",
      "",
      "",
      "",
    ]

    // check if it is break slide
    const slideProperty = splitSlide[3].includes("b") ? "BR" : "NM"

    const noteDifference = initialNote - endNote
    if (noteDifference > 0) {
      if (noteDifference < 4 && noteDifference >= 1) {
        slideNoteType = slideProperty + "SCL"
      } else {
        slideNoteType = slideProperty + "SCR"
      }
    } else {
      if (noteDifference > -4 && noteDifference <= -1) {
        slideNoteType = slideProperty + "SCR"
      } else {
        slideNoteType = slideProperty + "SCL"
      }
    }

    const slideNote = [
      slideNoteType,
      currentMeasure,
      currentDuration,
      initialNote,
      "slide delay time",
      slideDuration,
      endNote,
      "",
    ]
    ma2.push(strNote)
    ma2.push(slideNote)
  }
  function handleSCRCase(note, tap, str, breakTap, exTap) {
    const splitSlide = note
      .replace(">", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")
    // [initial note, end of slide, slide rhythm, slide rhythm multiplier]
    console.log(splitSlide, breakTap, exTap)

    const initialNote = parseInt(splitSlide[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseInt(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }

    const strNote = [
      noteType + "STR",
      currentMeasure,
      currentDuration,
      initialNote,
      "",
      "",
      "",
      "",
    ]
    let slideNote = ["", "", "", "", "", "", "", ""]

    const slideType = splitSlide[1].includes("b") ? "BR" : "NM"

    slideNote = [
      slideType + "SCR",
      currentMeasure,
      currentDuration,
      initialNote,
      "slide delay time",
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(strNote)
    ma2.push(slideNote)
  }
  function handleSCLCase(note, tap, str, breakTap, exTap) {
    const splitSlide = note
      .replace("<", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")
    // [initial note, end of slide, slide rhythm, slide rhythm multiplier]
    console.log(splitSlide)

    const initialNote = parseInt(splitSlide[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseInt(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }

    if (str) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]
      ma2.push(strNote)
    }

    const slideType = splitSlide[1].includes("b") ? "BR" : "NM"

    let slideNote = ["", "", "", "", "", "", "", ""]
    
    // Math.abs(initialNote - endNote) < 4
    if (initialNote === "0" || initialNote === "1" || initialNote === "6" || initialNote === "7") {
      slideNote = [
        slideType + "SCR",
        currentMeasure,
        currentDuration,
        initialNote,
        "slide delay time",
        slideDuration,
        endNote,
        "",
      ]
    } else {
      slideNote = [
        slideType + "SCL",
        currentMeasure,
        currentDuration,
        initialNote,
        "slide delay time",
        slideDuration,
        endNote,
        "",
      ]
    }
    ma2.push(slideNote)
  }
  function handleTapCase(note, breakTap, exTap) {
    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }
    const position = parseInt(note) - 1
    const tapNote = [
      noteType + "TAP",
      currentMeasure,
      currentDuration,
      position,
      "",
      "",
      "",
      "",
    ]
    ma2.push(tapNote)
  }
  function handleHoldCase(note, breakTap, exTap) {
    const splitHold = note.split("h")
    const regex = /(\d+)/g
    const matches = [...splitHold[1].matchAll(regex)]
    const numbers = matches.map((match) => match[1])

    const hold = parseInt(splitHold[0])
    const holdDuration = (parseInt(numbers[1]) * 384) / parseInt(numbers[0])

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }

    const holdNote = [
      noteType + "HLD",
      currentMeasure,
      currentDuration,
      hold - 1,
      holdDuration || 0,
      "",
      "",
      "",
    ]
    ma2.push(holdNote)
  }
  function handleSVCase(note, tap, str, breakTap, exTap) {
    const splitSlide = note
      .replace("v", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")
    const initialNote = parseInt(splitSlide[0]) - 1

    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }
    if (tap && str) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[3].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + "SV_",
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSICase(note, tap, str, breakTap, exTap, breakSlide) {
    console.log(tap, str)
    const splitSlide = note
      .replace("-", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")
    console.log(splitSlide)
    const initialNote = parseInt(splitSlide[0].match(/\d+/)[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }

    if (tap && str) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[3].includes("b") || splitSlide[1].includes("b") ||breakSlide
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + "SI_",
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSLCase(note, tap) {
    console.log(note)
    const splitSlide = note
      .replace("V", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")

    console.log(splitSlide)

    const initialNote = parseInt(splitSlide[0]) - 1
    const endNote = parseInt(splitSlide[1][1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    if (tap) {
      const b = splitSlide[0].includes("b") ? true : false

      const noteType = b ? "BRSTR" : "NMSTR"

      const strNote = [
        noteType,
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[3].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    let slideType = ""
    const initialPlus2 = initialNote + 2 > 8 ? initialNote - 6 : initialNote + 2
    console.log(initialNote, initialPlus2)
    const middleNote = parseInt(splitSlide[1][0]) - 1
    console.log(initialNote, initialPlus2, middleNote)

    slideType = initialPlus2 === middleNote ? "SLR" : "SLL"

    const slideNote = [
      slideProperty + slideType,
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSXCase(note, tap, slideDirection) {
    const splitSlide = note
      .replace("pp", ":")
      .replace("qq", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")

    console.log(splitSlide)

    const initialNote = parseInt(splitSlide[0].match(/\d+/)[0]) - 1
    console.log(initialNote)
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    if (tap) {
      const b = splitSlide[0].includes("b") ? true : false

      const noteType = b ? "BRSTR" : "NMSTR"

      const strNote = [
        noteType,
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[3].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + slideDirection,
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSUCase(note, tap, str, breakTap, exTap, slideDirection) {
    const splitSlide = note
      .replace("q", ":")
      .replace("p", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")
console.log(splitSlide)
    const initialNote = parseInt(splitSlide[0].match(/\d+/)[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }
    if (tap) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[3].includes("b") || splitSlide[1].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + slideDirection,
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSFCase(note, tap, str, breakTap, exTap) {
    const splitSlide = note
      .replace("w", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")

    console.log(splitSlide)

    const initialNote = parseInt(splitSlide[0].match(/\d+/)[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }
    if (tap && str) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[1].includes("b") || splitSlide[3].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + "SF_",
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }
  function handleSSCase(note, tap, str, breakTap, exTap, slideDirection) {
    const splitSlide = note
      .replace("s", ":")
      .replace("z", ":")
      .replace("[", ":")
      .replace("]", "")
      .split(":")

    console.log(splitSlide)
    const initialNote = parseInt(splitSlide[0].match(/\d+/)[0]) - 1
    const endNote = parseInt(splitSlide[1]) - 1
    const slideRhythm = parseInt(splitSlide[2])
    const slideRhythmMultiplier = parseFloat(splitSlide[3])
    const slideDuration = (slideRhythmMultiplier * 384) / slideRhythm

    let noteType = "NM"
    if (breakTap && exTap) {
      noteType = "BX"
    } else if (breakTap) {
      noteType = "BR"
    } else if (exTap) {
      noteType = "EX"
    }
    if (tap && str) {
      const strNote = [
        noteType + "STR",
        currentMeasure,
        currentDuration,
        initialNote,
        "",
        "",
        "",
        "",
      ]

      ma2.push(strNote)
    }

    const slideProperty = tap
      ? splitSlide[1].includes("b") || splitSlide[3].includes("b")
        ? "BR"
        : "NM"
      : "CN"

    const slideNote = [
      slideProperty + slideDirection,
      currentMeasure,
      tap ? currentDuration : "slide delay time",
      initialNote,
      tap ? "slide delay time" : 0,
      slideDuration,
      endNote,
      "",
    ]

    ma2.push(slideNote)
  }

  function handleSlashEachCase(note) {
    const notes = note.split("/")
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i]
      checkCases(currentNote)
    }
  }
  function handleEachCase(note) {
    const firstNote = note[0]
    const secondNote = note[1]
    handleTapCase(firstNote)
    handleTapCase(secondNote)
  }
  function handleBreakTapCase(note) {
    const position = parseInt(note) - 1
    const breakTapNote = [
      "BRTAP",
      currentMeasure,
      currentDuration,
      position,
      "",
      "",
      "",
      "",
    ]
    ma2.push(breakTapNote)
  }
  function handleTouchCase(note) {
    const touchArea = note[0]
    const position = note[1] - 1
    const flash = note.includes("f") ? 1 : 0
    const touchNote = [
      "NMTTP",
      currentMeasure,
      currentDuration,
      position,
      touchArea,
      flash,
      "M1",
      "",
    ]
    ma2.push(touchNote)
  }
  function handleCenterTouchTapCase(note) {
    const flash = note.includes("f") ? 1 : 0
    const touchType = note.includes("h") ? "THO" : "TTP"

    let centerTouchNote = [
      "NM" + touchType,
      currentMeasure,
      currentDuration,
      0,
      "C",
      flash,
      "M1",
      "",
    ]

    if (touchType === "THO") {
      const splitTouchHold = note.split("h")
      const regex = /(\d+)/g
      const matches = [...splitTouchHold[1].matchAll(regex)]
      const numbers = matches.map((match) => match[1])
      console.log(numbers)

      const rhythm = (numbers[1] * 384) / numbers[0]
      centerTouchNote.splice(4, 0, rhythm)
    }
    ma2.push(centerTouchNote)
  }
  function containsOnlyNumbers(note) {
    const pattern = /^\d+$/
    return pattern.test(note)
  }
  function checkLongSlide(note) {
    const ppRegex = new RegExp("pp", 'g')
    const ppMatches = note.match(ppRegex)
    const countpp = ppMatches ? ppMatches.length : 0

    const qqRegex = new RegExp("qq", 'g')
    const qqMatches = note.match(qqRegex)
    const countqq = qqMatches ? qqMatches.length : 0
    
    const pRegex = new RegExp("p", 'g')
    const pMatches = note.match(pRegex)
    let countp = pMatches ? pMatches.length : 0

    const qRegex = new RegExp("q", "g")
    const qMatches = note.match(qRegex)
    let countq = qMatches ? qMatches.length : 0

    countp -= 2 * countpp
    countq -= 2 * countqq

    const pattern = /[-^><Vvszw]/g
    const matches = note.match(pattern)
    const count = matches ? matches.length : 0

    const total = countpp + countqq + countp + countq + count
    console.log(countpp, countqq, countp, countq, count)
    return total >= 2
  }

  function checkAsteriskCase(note) {
    const splitSlide = note.split("*")
    console.log(splitSlide)

    const initialNote = splitSlide[0][0]

    const slide1 = splitSlide[0]
    const slide2 = initialNote + splitSlide[1]
    const str = true

    longSlideCase(slide1, str)
    longSlideCase(slide2, !str)
  }

  function longSlideCase(note, str) {
    const pattern = /[-^><vVpqszw]/g
    const matches = note.match(pattern)
    const slides =
      note.includes("pp") || note.includes("qq")
        ? matches.length - 1
        : matches.length
    console.log(note)
    // find rhythm
    let splitSlide = note
      .replace(/-/g, ":")
      .replace(/\^/g, ":")
      .replace(/V/g, ":")
      .replace(/v/g, ":")
      .replace(/>/g, ":")
      .replace(/</g, ":")
      .replace(/pp/g, ":")
      .replace(/qq/g, ":")
      .replace(/s/g, ":")
      .replace(/z/g, ":")
      .replace(/w/g, ":")
      .replace(/\[/g, ":")
      .replace(/]/g, "")
      .replace(/p/g, ":")
      .replace(/q/g, ":")
      .split(":")

    console.log(splitSlide)

    const breakTap = note[1] === "b" || note[2] === "b" ? true : false
    let breakSlide = splitSlide[splitSlide.length - 3].includes("b") // only set for first slide
    const exTap = note[1] === "x" || note[2] === "x" ? true : false
    const specialTap = note[1] === "b" || note[1] === "x" ? true : false
    const slideBreak = splitSlide[splitSlide.length - 1].includes("b")
    const rhythm = splitSlide[splitSlide.length - 2] * slides

    // 2-6-3V51
    // 2b-6-3V51
    // 4b^6-1[4:1]b
    // 5v4-1[4:1]
    // 4<8pp3[8:11]
    // 1bV35V71[4:27]
    // 1bxs5b[4:1]`8xz4[4:1]
    for (let i = 1; i < note.length - 1; i++) {
      if (pattern.test(note[i])) {
        const tap = i - 1 === 0 || i - 2 === 0 || i - 3 === 0 ? true : false
        console.log(tap)
        let slideNotation = note[i]
        // special case
        if (note[i] + note[i + 1] === "pp") {
          slideNotation = "pp"
        }
        if (note[i] + note[i + 1] === "qq") {
          slideNotation = "qq"
        }
        
        let slideNote =
          breakTap && exTap && tap
            ? note[i - 3] + note[i - 2] + note[i - 1] + slideNotation
            : breakTap || exTap && tap
            ? note[i - 2] + note[i - 1] + slideNotation
            : note[i - 1] + slideNotation

        slideNote +=
          slideNotation === "-" ||
          slideNotation === "^" ||
          slideNotation === "v" ||
          slideNotation === "<" ||
          slideNotation === ">" ||
          slideNotation === "z" ||
          slideNotation === "qq"
            ? note[i + 1]
            : note[i + 1] + note[i + 2]
        slideNote += `[${rhythm}:${parseInt(
          splitSlide[splitSlide.length - 1]
        )}]`
        slideNote += slideBreak ? "b" : ""
        console.log(slideNote)

        if (slideNotation === "-") {
          handleSICase(slideNote, tap, str, breakTap, exTap, breakSlide)
        }
        if (slideNotation === "V") {
          handleSLCase(slideNote, tap, str)
        }
        if (slideNotation === "^") {
          handleShortSCCase(slideNote, tap)
        }
        if (slideNotation === "v") {
          handleSVCase(slideNote, tap, str)
        }
        if (slideNotation === "pp") {
          handleSXCase(slideNote, tap, "SXL")
        }
        if (slideNotation === "<") {
          handleSCLCase(slideNote, tap, str, breakTap, exTap)
        }
        if (slideNotation === ">") {
          handleSCRCase(slideNote, tap, str, breakTap, exTap)
        }
        if (slideNotation === "s") {
          handleSSCase(slideNote, tap, str, breakTap, exTap, "SSL")
        }
        breakSlide = false // only true for once
      }
    }
  }
  function checkCases(note) {
    const tap = true
    const exTap = note.includes("x")
    const breakTap = note[1] === "b" || note[2] === "b" ? true : false
    const str = true

    // each case
    if (note.length === 2 && containsOnlyNumbers(note)) {
      handleEachCase(note)
      return
    }
    if (note.includes("/")) {
      handleSlashEachCase(note)
      return
    }
    // long slide case
    if (note.includes("*")) {
      checkAsteriskCase(note)
      return
    }
    if (checkLongSlide(note)) {
      longSlideCase(note, str)
      return
    }

    // touch case
    if (
      note.includes("A") ||
      note.includes("B") ||
      note.includes("D") ||
      note.includes("E")
    ) {
      handleTouchCase(note)
      return
    }
    if (note.includes("C")) {
      handleCenterTouchTapCase(note)
      return
    }

    // break case
    if (note.includes("b") && note.length === 2) {
      handleBreakTapCase(note)
      return
    }

    // hold case
    if (note.includes("h")) {
      handleHoldCase(note, breakTap, exTap)
      return
    }

    // tap case
    if (
      (note.length === 1 && containsOnlyNumbers(note)) ||
      (note.length === 2 && note.includes("x")) ||
      (note.length === 3 && note.includes("x") && note.includes("b"))
    ) {
      handleTapCase(note, breakTap, exTap)
      return
    }

    // slide case
    if (note.includes("pp")) {
      handleSXCase(note, tap, "SXL")
      return
    }
    if (note.includes("qq")) {
      handleSXCase(note, tap, "SXR")
      return
    }
    if (note.includes(">")) {
      handleSCRCase(note, tap, str, breakTap, exTap)
      return
    }
    if (note.includes("<")) {
      handleSCLCase(note, tap, str, breakTap, exTap)
      return
    }
    if (note.includes("^")) {
      handleShortSCCase(note)
      return
    }
    if (note.includes("-")) {
      handleSICase(note, tap, str, breakTap, exTap)
      return
    }
    if (note.includes("s")) {
      handleSSCase(note, tap, str, breakTap, exTap, "SSL")
      return
    }
    if (note.includes("z")) {
      handleSSCase(note, tap, str, breakTap, exTap, "SSR")
      return
    }
    if (note.includes("q")) {
      handleSUCase(note, tap, str, breakTap, exTap, "SUR")
      return
    }
    if (note.includes("p")) {
      handleSUCase(note, tap, str, breakTap, exTap, "SUL")
      return
    }
    if (note.includes("w")) {
      handleSFCase(note, tap, str, breakTap, exTap)
      return
    }
    if (note.includes("V")) {
      const splitSlide = note
        .replace("V", ":")
        .replace("[", ":")
        .replace("]", "")
        .split(":")

      const initialNote = parseInt(splitSlide[0]) - 1
      const middleNote = parseInt(splitSlide[1][0] - 1)
      const endNote = splitSlide[1][1] - 1

      let initialMiddleDifference = Math.abs(initialNote - middleNote)
      if (initialMiddleDifference > 4) {
        initialMiddleDifference = 8 - initialMiddleDifference
      }

      let middleEndDifference = Math.abs(middleNote - endNote)
      if (middleEndDifference > 4) {
        middleEndDifference = 8 - middleEndDifference
      }

      if (initialMiddleDifference === 2 && middleEndDifference === 2) {
        handleSLCase(note, tap)
        return
      } else {
        // 2V85[4:1]b
        const rhythm = parseInt(splitSlide[3]) * splitSlide[2] * 2
        const slideBreak = splitSlide[3].includes("b")
        // create first slide
        console.log(splitSlide)
        let slide1 = splitSlide[0] + "-" + splitSlide[1][0] + `[${rhythm}:1]`
        slide1 += slideBreak ? "b" : ""
        handleSICase(slide1, tap)
        // create secondSlide
        const slide2 =
          splitSlide[1][0] + "-" + splitSlide[1][1] + `[${rhythm}:1]`
        handleSICase(slide2, !tap)
        return
      }
    }
    if (note.includes("v")) {
      handleSVCase(note, tap, str, breakTap, exTap)
      return
    }
  }
}
