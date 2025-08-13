<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
    <div class="max-w-xl mx-auto p-6">
      <h2 class="text-2xl font-semibold mb-4 text-center">📝 Incident Report BBCode Generator</h2>

      <div class="space-y-3">
        <input v-model="caseNumber" placeholder="Case Number (e.g. 003)" class="w-full border rounded px-3 py-2" />

        <!-- Type -->
        <select v-model="type" class="w-full border rounded px-3 py-2">
          <option disabled value="">Select Type</option>
          <option>OIS</option>
          <option>LERI</option>
          <option>ICD</option>
          <option>CUOF</option>
        </select>

        <!-- Category -->
        <select v-model="category" class="w-full border rounded px-3 py-2">
          <option disabled value="">Select Category</option>
          <option>UFJ</option>
          <option>OGI</option>
          <option>UFU</option>
        </select>

        <input type="date" v-model="date" class="w-full border rounded px-3 py-2" />
        <input v-model="fullname" placeholder="Fullname (e.g. Lieutenant Zephyr Parker)" class="w-full border rounded px-3 py-2" />
        <input v-model="signature" placeholder="Signature Image URL (optional)" class="w-full border rounded px-3 py-2" />

        <!-- Tambahan input untuk OGI -->
        <div v-if="category === 'OGI'" class="space-y-2">
          <input v-model="invitationDate" placeholder="Investigation Date (e.g. August 3, 2025)" class="w-full border rounded px-3 py-2" />
          <input v-model="location" placeholder="Location (e.g. Rockshore Sub-HQ Investigation Room)" class="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <!-- Output BBCode -->
      <div class="mt-6">
        <label class="block font-semibold mb-1">Generated BBCode:</label>
        <textarea readonly :value="bbcode" rows="15" ref="bbcodeTextarea" class="w-full border rounded p-3 font-mono text-sm bg-gray-50"></textarea>
        <div v-if="bbcode !== ''">
          <button @click="copyBBCode" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">📋 Copy BBCode</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const caseNumber = ref("");
const type = ref("");
const category = ref("");
const date = ref("");
const fullname = ref("");
const signature = ref("");
const invitationDate = ref("");
const location = ref("");
const bbcodeTextarea = ref(null);

function formatDate(inputDate) {
  if (!inputDate) return "";
  const [year, month, day] = inputDate.split("-");
  return `${day}/${month}/${year}`;
}

const bbcode = computed(() => {
  const formattedDate = formatDate(date.value);

  const baseHeader = `[divbox=transparent]

[size=95]
[center][img]https://i.imgur.com/2Zt5baY.png[/img]

[b]INCIDENT REPORT[/b][/center]
[aligntable=left,270,15,0,0,0,transparent][b]CASE #:[/b] ${caseNumber.value || "XXX"}
[b]TYPE:[/b] ${type.value || "OIS/LERI/ICD/CUOF"}[/aligntable][aligntable=right,200,0,15,0,0,transparent][right][b]CATEGORY:[/b] ${category.value || ""}
[b]DATE:	[/b] ${formattedDate || "DD/MM/YYYY"}
[/aligntable]

[hr][/hr]
[center][b][size=80]RESULT INFORMATION[/b][/size][/center]
[hr][/hr]

[aligntable=middle,0,15,15,0,0,transparent]`;

  const footer = `[space][/space]
Best Regards,${signature.value ? `\n\n[img]${signature.value}[/img]` : ""}

${fullname.value || "[Fullname]"}
[/divbox]`;

  if (category.value === "UFJ") {
    return `${baseHeader}
By this letter, I would like to inform you that your incident report has been thoroughly reviewed. The use of force is Justified. 
There isn't any further investigation on your Incident Report.

${footer}`;
  }

  if (category.value === "OGI") {
    return `${baseHeader}
By this letter, I would like to inform you that your incident report has been thoroughly reviewed and now under investigation.
As a result, I would like to invite you to investigation in ${invitationDate.value || "[Month][DD],[YYYY]"} at ${location.value || "[LOCATION]"}.

If you have any questions or additional information, please mail it to the supervisor in-charge.

${footer}`;
  }

  if (category.value === "UFU") {
    return `${baseHeader}
By this letter, I would like to inform you that your incident report has been thoroughly reviewed and now under investigation.
As a result, the use of force on this incident report is unjustified.

If you have any questions or additional information, please mail it to the supervisor in-charge.

${footer}`;
  }

  return "";
});

function copyBBCode() {
  if (bbcodeTextarea.value) {
    navigator.clipboard.writeText(bbcode.value).then(() => {
      toast.success("BBCode copied to clipboard!");
    });
  }
}
</script>
