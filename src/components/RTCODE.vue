<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4 relative">
    <!-- Modal -->
    <div></div>
    <div v-if="showModal" class="absolute inset-0 flex items-center justify-center z-50 pt-60">
      <div class="bg-white border shadow-lg rounded-lg p-6 space-y-4 animate-modal-open w-[300px]">
        <h2 class="text-lg font-semibold text-center">Pilih District Anda Untuk Header</h2>
        <div>
          <select v-model="selectedDistrictValue" class="border rounded px-3 py-2 w-full">
            <option value="">-- Pilih Distrik --</option>
            <option v-for="district in districts" :key="district.value" :value="district.value">
              {{ district.label }}
            </option>
          </select>
        </div>
        <div v-if="selectedDistrictValue !== ''">
          <h2 class="text-lg font-semibold text-center">Pilih Tipe Laporan</h2>
          <div class="flex flex-col gap-2">
            <button @click="selectType('training')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Routine Training</button>
            <button @click="selectType('check')" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Routine Check</button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto p-4 space-y-6" v-show="!showModal">
      <h1 class="text-xl font-bold text-center">📄 {{ formType === "check" ? "Routine Check" : "Training Report" }} BBCode Generator</h1>

      <!-- Basic Info -->
      <div class="space-y-2">
        <input v-model="reportNumber" type="text" placeholder="Report Number" class="border rounded px-3 py-2 w-full" />
        <input v-model="date" type="date" class="border rounded px-3 py-2 w-full" />
        <div class="flex gap-2">
          <input v-model="timeStart" type="time" class="border rounded px-3 py-2 w-full" />
          <input v-model="timeEnd" type="time" class="border rounded px-3 py-2 w-full" />
        </div>
        <input v-model="location" type="text" placeholder="Location" class="border rounded px-3 py-2 w-full" />
        <input v-if="formType !== 'check'" v-model="topic" type="text" placeholder="Training Topic" class="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <h2 class="font-semibold mt-4">Training Images</h2>
        <div v-for="(img, index) in trainingImages" :key="index" class="flex gap-2 mb-2">
          <input v-model="trainingImages[index]" type="text" placeholder="Training Image URL" class="border rounded px-3 py-2 w-full" />
          <button @click="removeTrainingImage(index)" class="text-red-500">✕</button>
        </div>
        <button @click="addTrainingImage" class="bg-blue-500 text-white px-4 py-1 rounded">+ Add Image</button>
      </div>
      <!-- Lead Instructor -->
      <div class="border-t pt-4">
        <h2 class="font-semibold">Lead Instructor</h2>
        <select v-model="leadInstructor.rank" class="border rounded px-3 py-2 w-full">
          <option value="" disabled selected>Pilih Rank</option>
          <option style="color: #0000ff" value="Chief Of Police">Chief Of Police</option>
          <option style="color: #0000ff" value="Assistant Chief of Police">Assistant Chief of Police</option>
          <option style="color: #0000ff" value="Deputy Chief of Police">Deputy Chief of Police</option>
          <option style="color: #0000ff" value="Commander">Commander</option>
          <option style="color: #ac3300" value="Captain">Captain</option>
          <option style="color: #ac3300" value="Lieutenant">Lieutenant</option>
          <option style="color: #923333" value="Sergeant II">Sergeant II</option>
          <option style="color: #923333" value="Sergeant I">Sergeant I</option>
          <option style="color: #923333" value="Probationary Sergeant">Probationary Sergeant</option>
        </select>
        <input v-model="leadInstructor.name" placeholder="Name" class="border rounded px-3 py-2 w-full" />
      </div>

      <!-- Instructors -->
      <div>
        <h2 class="font-semibold mt-4">Instructors</h2>
        <div v-for="(instructor, index) in instructors" :key="index" class="flex gap-2 mb-2">
          <select v-model="instructor.rank" class="border rounded px-3 py-2 w-full">
            <option value="" disabled selected>Pilih Rank</option>
            <option style="color: #0000ff" value="Chief Of Police">Chief Of Police</option>
            <option style="color: #0000ff" value="Assistant Chief of Police">Assistant Chief of Police</option>
            <option style="color: #0000ff" value="Deputy Chief of Police">Deputy Chief of Police</option>
            <option style="color: #0000ff" value="Commander">Commander</option>
            <option style="color: #ac3300" value="Captain">Captain</option>
            <option style="color: #ac3300" value="Lieutenant">Lieutenant</option>
            <option style="color: #923333" value="Sergeant II">Sergeant II</option>
            <option style="color: #923333" value="Sergeant I">Sergeant I</option>
            <option style="color: #923333" value="Probationary Sergeant">Probationary Sergeant</option>
          </select>
          <input v-model="instructor.name" placeholder="Name" class="border rounded px-3 py-2 w-full" />
          <button @click="instructors.splice(index, 1)" class="text-red-500">✕</button>
        </div>
        <button @click="addInstructor" class="bg-blue-500 text-white px-4 py-1 rounded">+ Add Instructor</button>
      </div>

      <!-- Participants -->
      <div>
        <h2 class="font-semibold mt-4">Participants</h2>
        <div v-for="(participant, index) in participants" :key="index" class="flex gap-2 mb-2">
          <select v-model="participant.rank" class="border rounded px-3 py-2 w-full">
            <option disabled selected value="">Pilih Rank</option>
            <option style="color: #0080ff" value="Police Officer III">Police Officer III</option>
            <option style="color: #0080ff" value="Police Officer II">Police Officer II</option>
            <option style="color: #0080ff" value="Police Officer I">Police Officer I</option>
            <option style="color: #408000" value="Senior Reserve">Senior Reserve</option>
            <option style="color: #408000" value="Junior Reserve">Junior Reserve</option>
          </select>
          <input v-model="participant.name" placeholder="Name" class="border rounded px-3 py-2 w-full" />
          <select v-model="participant.district" class="border rounded px-3 py-2 w-full">
            <option value="">Pilih District(Jika kosong pilih ini)</option>
            <option value="Central Headquarter">Central Headquarter</option>
            <option value="East Beach Precinct">East Beach Precinct</option>
            <option value="Dillimore Precinct">Dillimore Precinct</option>
            <option value="Flint County Precinct">Flint County Precinct</option>
            <option value="Fort Carson Precinct">Fort Carson Precinct</option>
            <option value="Rockshore Sub-Headquarter">Rockshore Sub-Headquarter</option>
            <option value="Metropolitan Division">Metropolitan Division</option>
            <option value="Detective Berau">Detective Berau</option>
          </select>
          <button @click="participants.splice(index, 1)" class="text-red-500">✕</button>
        </div>
        <button @click="addParticipant" class="bg-blue-500 text-white px-4 py-1 rounded">+ Add Participant</button>
      </div>

      <!-- Signature -->
      <div class="border-t pt-4">
        <h2 class="font-semibold">Signature</h2>
        <input v-model="signature.img" placeholder="Your Signature Img Url(optional) " class="border rounded px-3 py-2 w-full" />
        <input v-model="signature.name" placeholder="[District's rank][Name]" class="border rounded px-3 py-2 w-full" />
      </div>

      <!-- BBCode Output -->
      <div>
        <h2 class="font-semibold mt-6">📋 Generated BBCode</h2>
        <textarea v-model="generatedBBCode" readonly class="border rounded px-3 py-2 w-full h-96 font-mono"></textarea>
        <button @click="copyToClipboard" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">📋 Copy BBCode</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const reportNumber = ref("");
const date = ref("");
const timeStart = ref("");
const timeEnd = ref("");
const location = ref("");
const topic = ref("");
const trainingImages = ref([""]);
const leadInstructor = ref({ rank: "", name: "" });
const instructors = ref([]);
const participants = ref([]);
const signature = ref({ name: "", img: "" });
const formType = ref("training");
const showModal = ref(true);
const selectedDistrictValue = ref("");

const selectedDistrict = computed(() => districts.value.find((d) => d.value === selectedDistrictValue.value) || {});

const addInstructor = () => instructors.value.push({ rank: "", name: "" });
const addParticipant = () => participants.value.push({ rank: "", name: "", district: "" });
const addTrainingImage = () => trainingImages.value.push("");
const removeTrainingImage = (index) => trainingImages.value.splice(index, 1);

const formatDate = (val) => {
  if (!val) return "";
  const [year, month, day] = val.split("-");
  return `${day}/${month}/${year}`;
};

const districtOptions = [
  {
    value: "Central",
    label: "Central Headquarter",
    headerUrl: "https://i.imgur.com/gmfwnOf.png",
  },
  {
    value: "Dillimore",
    label: "Dillimore Precinct",
    headerUrl: "https://i.postimg.cc/3rk4KDPZ/Header-Dillimore.png",
  },
  {
    value: "East Beach",
    label: "East Beach Precinct",
    headerUrl: "https://i.postimg.cc/nhGMdKDn/Header-East-Beach.png",
  },
  {
    value: "Fort Carson",
    label: "Fort Carson Precinct",
    headerUrl: "https://imgur.com/d1gujUx.png",
  },
  {
    value: "Flint County",
    label: "Flint County Precinct",
    headerUrl: "https://imgur.com/R9Y4tzm.png",
  },
  {
    value: "Rockshore",
    label: "Rockshore Sub-Headquarter",
    headerUrl: "https://i.imgur.com/PWIyERj.png",
  },
];

const selectType = (type) => {
  formType.value = type;
  showModal.value = false;
};

const districts = ref(districtOptions);

const rankColor = (rank) => {
  if (/chief|assistant|deputy|commander/i.test(rank)) return "#0000FF";
  if (/captain|lieutenant/i.test(rank)) return "#ac3300";
  if (/sergeant|prob.sergeant/i.test(rank)) return "#923333";
  if (/officer/i.test(rank)) return "#0080FF";
  if (/reserve/i.test(rank)) return "#408000";
  return "black";
};

const generatedBBCode = computed(() => {
  const instructorList = instructors.value.map((i) => `[*][b][color=${rankColor(i.rank)}]${i.rank}[/color][/b] ${i.name}`).join("\n");
  const participantList = participants.value
    .map((p) => {
      const districtText = p.district ? ` - ${p.district}` : "";
      return `[*][b][color=${rankColor(p.rank)}]${p.rank}[/color][/b] ${p.name}${districtText}`;
    })
    .join("\n");

  const topicLine = formType.value === "check" ? "" : `[*][b]Training topic:[/b] ${topic.value}`;

  const imageSection = trainingImages.value.length > 0 ? `[spoiler]\n${trainingImages.value.map((url) => `[img]${url}.png[/img]`).join("\n")}\n[/spoiler]` : "";

  return `[divbox=white][center][img]${selectedDistrict.value.headerUrl}[/img][/center]
[center][size=150][b]${selectedDistrict.value.label} ${formType.value === "check" ? "Routine Check" : "Training Report"} #${reportNumber.value}[/b][/size][/center]
[hr][/hr]
[hr][/hr]
[list][b]Date:[/b] ${formatDate(date.value)}
[*][b]Time:[/b] ${timeStart.value} - ${timeEnd.value} 
[*][b]Location:[/b] ${location.value}
${topicLine}
[*][b]Attenders:[/b]
[list=a]
[*][b]Lead Instructor:[/b] [b][color=${rankColor(leadInstructor.value.rank)}]${leadInstructor.value.rank}[/color][/b] ${leadInstructor.value.name}
[*][b]Instructor:[/b]
[list=1]
${instructorList}
[/list]
[*][b]Participants:[/b]
[list=1]
${participantList}
[/list]
[/list][/list]
${imageSection}
[right]Regards,
[img]${signature.value.img}.png[/img]
[b]${signature.value.name}[/b][/right]
[/divbox]`;
});

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(generatedBBCode.value);
  toast.success("BBCode copied!");
};
</script>

<style scoped>
@keyframes modal-open {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal-open {
  animation: modal-open 0.3s ease-out;
}
</style>
